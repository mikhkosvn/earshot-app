import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { OPEN_RUN_STATUSES } from '@/server/runs/constants/run-status-groups';

interface FailRunArgs {
  runId: number;
  errorMessage: string;
  status?: RunStatus;
}

export const failRun = async ({
  runId,
  errorMessage,
  status = RunStatus.failed,
}: FailRunArgs) => {
  const { count } = await prisma.run.updateMany({
    where: { id: runId, status: { in: OPEN_RUN_STATUSES } },
    data: { status, errorMessage },
  });
  return count > 0;
};
