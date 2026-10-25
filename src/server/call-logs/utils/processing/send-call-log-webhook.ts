import 'server-only';

import { WebhookNotification } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallLogStep } from '@/server/call-logs/constants/call-log-step';
import {
  publicCallLogSelect,
  toPublicCallLog,
} from '@/server/call-logs/utils/payload/public-call-log';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { sendProjectWebhook } from '@/server/project-webhooks/send-project-webhook';
import type { SendProjectWebhookResult } from '@/server/project-webhooks/types';

const notificationOf = (event: WebhookEvent, success: boolean | null) => {
  if (event === WebhookEvent.callLogReevaluated) {
    if (success === false) {
      return WebhookNotification.call_log_reevaluated_failure;
    }
    return WebhookNotification.call_log_reevaluated_success;
  }
  if (success === false) return WebhookNotification.call_log_failure;
  return WebhookNotification.call_log_success;
};

const deliveryFields = (result: SendProjectWebhookResult) => {
  if (!result.sent) return { sent: false, skip_reason: result.skipReason };
  return { sent: true, ok: result.ok, status_code: result.status };
};

export const sendCallLogWebhook = async ({
  callLogId,
  event,
  origin,
}: {
  callLogId: number;
  event: WebhookEvent;
  origin: string | null;
}) => {
  try {
    const record = await prisma.callLog.findUniqueOrThrow({
      where: { id: callLogId },
      select: publicCallLogSelect,
    });
    const payload = toPublicCallLog(record, origin);
    const result = await sendProjectWebhook({
      projectId: record.projectId,
      event,
      payload,
      notification: notificationOf(event, payload.success),
      idempotencyKey: `${event}:${callLogId}:${record.updatedAt.getTime()}`,
    });
    addEventFields({ webhook: { event, ...deliveryFields(result) } });
  } catch (error) {
    recordStepFailure(CallLogStep.webhook_delivery, error);
  }
};
