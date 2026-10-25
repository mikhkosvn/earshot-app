import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { resultIdSchema } from '@/server/results/schemas';
import type { ResultStatusView } from '@/server/results/types';
import { isPassedEvaluation } from '@/server/results/utils/result-row';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

export const getResultStatus = withValidation(
  resultIdSchema,
  async ({ resultId }): Promise<ResultStatusView> => {
    const { user } = await requireUser();
    const result = await prisma.result.findUniqueOrThrow({
      where: { id: resultId, project: projectAccessWhere(user.id) },
      select: {
        id: true,
        status: true,
        aiSummaryStatus: true,
        runs: { select: { status: true, evaluationStatus: true } },
      },
    });
    const completed = result.runs.filter((run) =>
      isTerminalRunStatus(run.status),
    ).length;
    const success = result.runs.filter((run) =>
      isPassedEvaluation(run.evaluationStatus),
    ).length;
    addEventFields({
      result: {
        id: result.id,
        status: result.status,
        run_count: result.runs.length,
        completed_run_count: completed,
      },
    });
    return {
      id: result.id,
      status: result.status,
      total: result.runs.length,
      completed,
      success,
      failed: completed - success,
      aiSummaryStatus: result.aiSummaryStatus,
    };
  },
);
