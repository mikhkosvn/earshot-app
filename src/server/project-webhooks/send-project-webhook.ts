import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import {
  addEventFields,
  recordExternalError,
} from '@/server/common/logging/event-fields';
import {
  WebhookOperation,
  WebhookSkipReason,
} from '@/server/project-webhooks/constants/webhook-delivery';
import { CALL_LOG_WEBHOOK_EVENTS } from '@/server/project-webhooks/constants/webhook-event';
import type {
  SendProjectWebhookInput,
  SendProjectWebhookResult,
  WebhookDelivery,
} from '@/server/project-webhooks/types';
import { hasConversationContent } from '@/server/project-webhooks/utils/has-conversation-content';
import { postProjectWebhook } from '@/server/project-webhooks/utils/post-project-webhook';
import { readProjectWebhook } from '@/server/project-webhooks/utils/read-project-webhook';

const skipped = (skipReason: WebhookSkipReason): SendProjectWebhookResult => {
  addEventFields({ webhook: { sent: false, skip_reason: skipReason } });
  return { sent: false, skipReason };
};

const deliveryFailure = (delivery: WebhookDelivery) =>
  new ExternalCallError({
    service: ExternalService.webhook,
    operation: WebhookOperation.deliver,
    attempt: 1,
    message:
      delivery.error ?? `The endpoint answered with status ${delivery.status}.`,
    status_code: delivery.status ?? undefined,
  });

export const sendProjectWebhook = async ({
  projectId,
  notification,
  ...input
}: SendProjectWebhookInput): Promise<SendProjectWebhookResult> => {
  addEventFields({ webhook: { event: input.event, notification } });
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
  addEventFields({
    webhook: {
      sent: true,
      ok: delivery.ok,
      status_code: delivery.status,
      duration_ms: delivery.durationMs,
    },
  });
  if (!delivery.ok) {
    recordExternalError(deliveryFailure(delivery));
  }
  return { sent: true, ...delivery };
};
