import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateCallReviewSchema } from '@/server/call-logs/schemas';
import { requireCallLogAccess } from '@/server/call-logs/utils/call-log-access';
import { withValidation } from '@/server/common/run-action';

export const updateCallReview = withValidation(
  updateCallReviewSchema,
  async ({ callLogId, evaluationStatus }) => {
    await requireCallLogAccess(callLogId);
    return prisma.callLog.update({
      where: { id: callLogId },
      data: { evaluationStatus },
      select: { id: true, evaluationStatus: true },
    });
  },
);
