import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateCallReviewSchema } from '@/server/call-logs/schemas';
import { requireCallLogAccess } from '@/server/call-logs/utils/call-log-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const updateCallReview = withValidation(
  updateCallReviewSchema,
  async ({ callLogId, evaluationStatus }) => {
    const { callLog } = await requireCallLogAccess(callLogId);
    addEventFields({
      call_log: { id: callLog.id, evaluation_status: evaluationStatus },
      project: { id: callLog.projectId },
    });
    return prisma.callLog.update({
      where: { id: callLogId },
      data: { evaluationStatus },
      select: { id: true, evaluationStatus: true },
    });
  },
);
