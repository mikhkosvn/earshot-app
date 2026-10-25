import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { resultIdSchema } from '@/server/runs/schemas';
import type { RunBatchStatus } from '@/server/runs/types';
import { readSnapshotName } from '@/server/runs/utils/evaluator-snapshot';
import { resultAccessWhere } from '@/server/runs/utils/result-access-where';
import { countRuns } from '@/server/runs/utils/run-counts';

export const getRunBatchStatus = withValidation(
  resultIdSchema,
  async ({ resultId }): Promise<RunBatchStatus> => {
    const { user } = await requireUser();
    const result = await prisma.result.findUniqueOrThrow({
      where: { id: resultId, ...resultAccessWhere(user.id) },
      select: {
        id: true,
        projectId: true,
        name: true,
        status: true,
        runs: {
          orderBy: { id: Prisma.SortOrder.asc },
          select: {
            id: true,
            status: true,
            evaluationStatus: true,
            errorMessage: true,
            evaluatorSnapshot: true,
            evaluator: { select: { name: true } },
            personality: { select: { name: true } },
          },
        },
      },
    });
    const counts = countRuns(result.runs);
    addEventFields({
      result: {
        id: result.id,
        status: result.status,
        run_count: counts.total,
        finished_run_count: counts.finished,
      },
      project: { id: result.projectId },
    });
    return {
      resultId: result.id,
      projectId: result.projectId,
      name: result.name,
      status: result.status,
      totalRuns: counts.total,
      finishedRuns: counts.finished,
      successRuns: counts.success,
      failedRuns: counts.failed,
      runs: result.runs.map((run) => ({
        id: run.id,
        evaluatorName:
          run.evaluator?.name ?? readSnapshotName(run.evaluatorSnapshot),
        personalityName: run.personality?.name ?? null,
        status: run.status,
        evaluationStatus: run.evaluationStatus,
        errorMessage: run.errorMessage,
      })),
    };
  },
);
