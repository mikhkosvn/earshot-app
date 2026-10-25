export const WEBHOOK_SECRET_HEADER = 'X-Earshot-Secret';
export const WEBHOOK_SIGNATURE_HEADER = 'X-Earshot-Signature';
export const WEBHOOK_EVENT_HEADER = 'X-Earshot-Event';
export const WEBHOOK_IDEMPOTENCY_HEADER = 'X-Earshot-Idempotency-Key';
export const WEBHOOK_SIGNATURE_PREFIX = 'sha256=';
export const WEBHOOK_TIMEOUT_MS = 10_000;
export const WEBHOOK_USER_AGENT = 'Earshot-Webhook/1.0';

export const WebhookSkipReason = {
  notConfigured: 'not_configured',
  notificationDisabled: 'notification_disabled',
  noContent: 'no_content',
} as const;

export type WebhookSkipReason =
  (typeof WebhookSkipReason)[keyof typeof WebhookSkipReason];
