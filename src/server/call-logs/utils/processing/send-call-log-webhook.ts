import 'server-only';

import { WebhookNotification } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  publicCallLogSelect,
  toPublicCallLog,
} from '@/server/call-logs/utils/payload/public-call-log';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { sendProjectWebhook } from '@/server/project-webhooks/send-project-webhook';

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
    await sendProjectWebhook({
      projectId: record.projectId,
      event,
      payload,
      notification: notificationOf(event, payload.success),
      idempotencyKey: `${event}:${callLogId}:${record.updatedAt.getTime()}`,
    });
  } catch (error) {
    console.error(
      `[call-logs] The webhook ${event} of call log ${callLogId} failed.`,
      error,
    );
  }
};
