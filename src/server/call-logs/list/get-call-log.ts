import 'server-only';

import { prisma } from '@/lib/prisma';
import { callLogIdSchema } from '@/server/call-logs/schemas';
import type { CallLogDetail } from '@/server/call-logs/types';
import { callLogAccessWhere } from '@/server/call-logs/utils/call-log-access';
import {
  callLogRowSelect,
  toCallLogRow,
} from '@/server/call-logs/utils/call-log-row';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';

export const getCallLog = withValidation(
  callLogIdSchema,
  async ({ callLogId }): Promise<CallLogDetail> => {
    const { user } = await requireUser();
    const record = await prisma.callLog.findUniqueOrThrow({
      where: { id: callLogId, ...callLogAccessWhere(user.id) },
      select: callLogRowSelect,
    });
    const rubric = await computeRubricVerdict({
      conversationId: record.conversationId,
    });
    return { ...toCallLogRow(record), rubric };
  },
);
