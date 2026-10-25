import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateCallFeedbackSchema } from '@/server/call-logs/schemas';
import { requireCallLogAccess } from '@/server/call-logs/utils/call-log-access';
import { withValidation } from '@/server/common/run-action';

export const updateCallFeedback = withValidation(
  updateCallFeedbackSchema,
  async ({ callLogId, feedback }) => {
    await requireCallLogAccess(callLogId);
    return prisma.callLog.update({
      where: { id: callLogId },
      data: { feedback: feedback || null },
      select: { id: true, feedback: true },
    });
  },
);
