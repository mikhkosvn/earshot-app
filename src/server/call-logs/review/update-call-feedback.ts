import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateCallFeedbackSchema } from '@/server/call-logs/schemas';
import { requireCallLogAccess } from '@/server/call-logs/utils/call-log-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const updateCallFeedback = withValidation(
  updateCallFeedbackSchema,
  async ({ callLogId, feedback }) => {
    const { callLog } = await requireCallLogAccess(callLogId);
    addEventFields({
      call_log: { id: callLog.id, has_feedback: Boolean(feedback) },
      project: { id: callLog.projectId },
    });
    return prisma.callLog.update({
      where: { id: callLogId },
      data: { feedback: feedback || null },
      select: { id: true, feedback: true },
    });
  },
);
