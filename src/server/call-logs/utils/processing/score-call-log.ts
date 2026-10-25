import 'server-only';

import {
  CallEvaluationStatus,
  CallProcessingStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { REVIEW_STATUSES } from '@/server/call-logs/constants/call-review';
import { sendCallLogWebhook } from '@/server/call-logs/utils/processing/send-call-log-webhook';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import { scoreConversation } from '@/server/metric-scoring/score-conversation';
import type { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';

const nextEvaluationStatus = (
  current: CallEvaluationStatus | null,
  passed: boolean,
) => {
  if (current && REVIEW_STATUSES.includes(current)) return current;
  if (passed) return CallEvaluationStatus.success;
  return CallEvaluationStatus.failure;
};

export const scoreCallLog = async ({
  callLogId,
  event,
  origin,
}: {
  callLogId: number;
  event: WebhookEvent;
  origin: string | null;
}) => {
  const callLog = await prisma.callLog.update({
    where: { id: callLogId },
    data: { status: CallProcessingStatus.evaluating },
    select: { projectId: true, conversationId: true, evaluationStatus: true },
  });
  await scoreConversation({
    projectId: callLog.projectId,
    conversationId: callLog.conversationId,
  });
  const verdict = await computeRubricVerdict({
    conversationId: callLog.conversationId,
  });
  await prisma.callLog.update({
    where: { id: callLogId },
    data: {
      status: CallProcessingStatus.completed,
      evaluationStatus: nextEvaluationStatus(
        callLog.evaluationStatus,
        verdict.passed,
      ),
    },
  });
  await sendCallLogWebhook({ callLogId, event, origin });
  return verdict;
};
