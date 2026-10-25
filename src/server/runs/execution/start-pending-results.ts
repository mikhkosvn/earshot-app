import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { RESULT_START_BATCH_SIZE } from '@/server/runs/constants/run-limits';
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
    console.error(
      `[runs] The pre-trigger webhook of result ${resultId} failed.`,
      error,
    );
  }
  await queueRuns(resultId);
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
  for (const resultId of resultIds) await startResult(resultId);
  return resultIds.length;
};
