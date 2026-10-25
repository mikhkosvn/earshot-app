import 'server-only';

import { JobKind, RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import { analyzeResult } from '@/server/result-analysis/analyze-result';
import { finalResultStatus } from '@/server/runs/completion/close-result';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';
import { scoreRun } from '@/server/runs/execution/score-run';
import { keepReviewedStatus } from '@/server/runs/reevaluation/apply-evaluation-status';
import { reevaluateResultSchema } from '@/server/runs/schemas';
import type { StartedReevaluation } from '@/server/runs/types';
import { resultAccessWhere } from '@/server/runs/utils/result-access-where';

const RESULT_RUNNING_MESSAGE =
  'The result is still running. Reevaluate it after all runs end.';
const NO_RUNS_MESSAGE = 'The result has no completed runs to reevaluate.';

type ReevaluationInput = {
  resultId: number;
  metricIds: number[] | null;
  runIds: number[];
};

const runIdFilter = (runIds: number[] | undefined) => {
  if (!runIds) return {};
  return { id: { in: runIds } };
};

const rescoreRuns = async (
  projectId: number,
  input: ReevaluationInput,
  setStep: (text: string) => Promise<void>,
) => {
  const runs = await prisma.run.findMany({
    where: { id: { in: input.runIds } },
    select: {
      id: true,
      conversationId: true,
      evaluatorId: true,
      evaluatorSnapshot: true,
      evaluationStatus: true,
    },
  });
  for (const [index, run] of runs.entries()) {
    await setStep(`Reevaluating run ${index + 1} of ${runs.length}`);
    const computed = await scoreRun({
      projectId,
      conversationId: run.conversationId,
      evaluatorId: run.evaluatorId,
      evaluatorSnapshot: run.evaluatorSnapshot,
      metricIds: input.metricIds ?? undefined,
    });
    await prisma.run.update({
      where: { id: run.id },
      data: {
        evaluationStatus: keepReviewedStatus(run.evaluationStatus, computed),
      },
    });
  }
  addEventFields({ reevaluation: { rescored_run_count: runs.length } });
  return runs.length;
};

const restoreResultStatus = async (resultId: number) => {
  const runs = await prisma.run.findMany({
    where: { resultId },
    select: { status: true },
  });
  await prisma.result.update({
    where: { id: resultId },
    data: { status: finalResultStatus(runs) },
  });
};

export const reevaluateResult = withValidation(
  reevaluateResultSchema,
  async ({ resultId, metricIds, runIds }): Promise<StartedReevaluation> => {
    const { user } = await requireUser();
    const result = await prisma.result.findUniqueOrThrow({
      where: { id: resultId, ...resultAccessWhere(user.id) },
      select: { id: true, projectId: true, status: true },
    });
    if (!isTerminalRunStatus(result.status)) {
      throw new ActionError(RESULT_RUNNING_MESSAGE);
    }
    const runs = await prisma.run.findMany({
      where: { resultId, status: RunStatus.completed, ...runIdFilter(runIds) },
      select: { id: true },
    });
    addEventFields({
      result: { id: resultId, status: result.status },
      project: { id: result.projectId },
      reevaluation: {
        run_count: runs.length,
        metric_count: metricIds?.length ?? null,
      },
    });
    if (runs.length === 0) throw new ActionError(NO_RUNS_MESSAGE);
    await prisma.result.update({
      where: { id: resultId },
      data: { status: RunStatus.running },
    });
    const input: ReevaluationInput = {
      resultId,
      metricIds: metricIds ?? null,
      runIds: runs.map((run) => run.id),
    };
    return startJob({
      projectId: result.projectId,
      userId: user.id,
      kind: JobKind.reevaluation,
      input,
      initialStep: 'Reevaluating metrics',
      run: async (context) => {
        try {
          const count = await rescoreRuns(
            result.projectId,
            input,
            context.setStep,
          );
          await context.setStep('Updating the result analysis');
          await analyzeResult(resultId);
          await context.setResult({
            summary: `Reevaluated ${count} run(s).`,
            deepLink: UrlGenerator.result({
              projectId: result.projectId,
              resultId,
            }),
          });
        } finally {
          await restoreResultStatus(resultId);
        }
      },
    });
  },
);
