import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import { RunMessage } from '@/server/runs/constants/run-messages';
import { QUEUED_RUN_STATUSES } from '@/server/runs/constants/run-status-groups';
import { resultIdSchema } from '@/server/runs/schemas';
import type { CancelledResult } from '@/server/runs/types';
import { resultAccessWhere } from '@/server/runs/utils/result-access-where';

const CANCELLED_MESSAGE = 'The run was cancelled.';

export const cancelResult = withValidation(
  resultIdSchema,
  async ({ resultId }): Promise<CancelledResult> => {
    const { user } = await requireUser();
    await prisma.result.findUniqueOrThrow({
      where: { id: resultId, ...resultAccessWhere(user.id) },
      select: { id: true },
    });
    const { count } = await prisma.run.updateMany({
      where: { resultId, status: { in: QUEUED_RUN_STATUSES } },
      data: { status: RunStatus.cancelled, errorMessage: CANCELLED_MESSAGE },
    });
    if (count === 0) throw new ActionError(RunMessage.resultNotCancellable);
    await closeResultIfDone(resultId);
    return { resultId, cancelledCount: count };
  },
);
