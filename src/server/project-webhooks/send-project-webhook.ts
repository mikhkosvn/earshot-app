import 'server-only';

import { WebhookSkipReason } from '@/server/project-webhooks/constants/webhook-delivery';
import { CALL_LOG_WEBHOOK_EVENTS } from '@/server/project-webhooks/constants/webhook-event';
import type {
  SendProjectWebhookInput,
  SendProjectWebhookResult,
} from '@/server/project-webhooks/types';
import { hasConversationContent } from '@/server/project-webhooks/utils/has-conversation-content';
import { postProjectWebhook } from '@/server/project-webhooks/utils/post-project-webhook';
import { readProjectWebhook } from '@/server/project-webhooks/utils/read-project-webhook';

const skipped = (skipReason: WebhookSkipReason): SendProjectWebhookResult => ({
  sent: false,
  skipReason,
});

export const sendProjectWebhook = async ({
  projectId,
  notification,
  ...input
}: SendProjectWebhookInput): Promise<SendProjectWebhookResult> => {
  const webhook = await readProjectWebhook(projectId);
  if (!webhook?.url) return skipped(WebhookSkipReason.notConfigured);
  if (notification && !webhook.notifications.includes(notification)) {
    return skipped(WebhookSkipReason.notificationDisabled);
  }
  if (
    webhook.skipCallsWithoutContent &&
    CALL_LOG_WEBHOOK_EVENTS.includes(input.event) &&
    !hasConversationContent(input.payload)
  ) {
    return skipped(WebhookSkipReason.noContent);
  }
  const delivery = await postProjectWebhook({ ...input, webhook });
  if (!delivery.ok) {
    console.error(
      `[webhook] The delivery of ${input.event} for project ${projectId} failed.`,
      { status: delivery.status, error: delivery.error },
    );
  }
  return { sent: true, ...delivery };
};
