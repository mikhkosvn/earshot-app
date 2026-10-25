import 'server-only';

import { CALL_LOG_WEBHOOK_EVENTS } from '@/server/project-webhooks/constants/webhook-event';
import type {
  SendProjectWebhookInput,
  WebhookDelivery,
} from '@/server/project-webhooks/types';

import { deliverWebhook } from './deliver-webhook';
import type { StoredProjectWebhook } from './read-project-webhook';
import { redactWebhookPayload } from './redact-webhook-payload';

type PostProjectWebhookInput = Omit<
  SendProjectWebhookInput,
  'projectId' | 'notification'
> & {
  webhook: StoredProjectWebhook;
};

const payloadForEvent = ({
  webhook,
  event,
  payload,
}: PostProjectWebhookInput) => {
  if (!CALL_LOG_WEBHOOK_EVENTS.includes(event)) return payload;
  return redactWebhookPayload(payload, webhook.redactionFields);
};

export const postProjectWebhook = (
  input: PostProjectWebhookInput,
): Promise<WebhookDelivery> =>
  deliverWebhook({
    url: input.webhook.url,
    secret: input.webhook.secret,
    body: { event_type: input.event, data: payloadForEvent(input) },
    idempotencyKey: input.idempotencyKey,
    timeoutMs: input.timeoutMs,
  });
