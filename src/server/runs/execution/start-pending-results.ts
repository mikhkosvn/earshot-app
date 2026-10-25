import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { RESULT_START_BATCH_SIZE } from '@/server/runs/constants/run-limits';
import { RunStep } from '@/server/runs/constants/run-logging';
import { sendPreTriggerWebhook } from '@/server/runs/webhooks/send-pre-trigger-webhook';
import { claimRows } from '@/server/worker/claim-rows';

const queueRuns = (resultId: number) =>
  prisma.run.updateMany({
    where: { resultId, status: RunStatus.pending },
    data: { status: RunStatus.in_queue },
  });

const startResult = async (resultId: number) => {
  try {
    await sendPreTriggerWebhook(resultId);
  } catch (error) {
    recordStepFailure(RunStep.pre_trigger_webhook, error);
  }
  const { count } = await queueRuns(resultId);
  return count;
};

export const startPendingResults = async () => {
  const resultIds = await claimRows<number>({
    table: 'Result',
    where: Prisma.sql`"status" = ${RunStatus.pending}::"RunStatus"`,
    orderBy: Prisma.sql`"createdAt", "id"`,
    limit: RESULT_START_BATCH_SIZE,
    claim: async (tx, ids) => {
      await tx.result.updateMany({
        where: { id: { in: ids } },
        data: { status: RunStatus.running },
      });
    },
  });
  let queuedRuns = 0;
  for (const resultId of resultIds) queuedRuns += await startResult(resultId);
  addEventFields({
    dispatch: {
      started_results: resultIds.length,
      started_result_ids: resultIds,
      queued_runs: queuedRuns,
    },
  });
  return resultIds.length;
};
