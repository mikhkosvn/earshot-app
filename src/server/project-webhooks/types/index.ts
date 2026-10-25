import type { z } from 'zod';

import type {
  RedactionField,
  WebhookNotification,
} from '@/generated/prisma/enums';
import type { WebhookSkipReason } from '@/server/project-webhooks/constants/webhook-delivery';
import type { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import type {
  projectWebhookIdSchema,
  saveProjectWebhookSchema,
  testProjectWebhookSchema,
  webhookSettingsSchema,
} from '@/server/project-webhooks/schemas';

export type ProjectWebhookIdInput = z.input<typeof projectWebhookIdSchema>;
export type SaveProjectWebhookInput = z.input<typeof saveProjectWebhookSchema>;
export type TestProjectWebhookInput = z.input<typeof testProjectWebhookSchema>;
export type WebhookSettingsValues = z.input<typeof webhookSettingsSchema>;

export type ProjectWebhookSettings = {
  url: string;
  secretConfigured: boolean;
  notifications: WebhookNotification[];
  redactionFields: RedactionField[];
  skipCallsWithoutContent: boolean;
  forwardVapiWebhooks: boolean;
  forwardRetellWebhooks: boolean;
};

export type WebhookPayload = Record<string, unknown>;

export type WebhookBody = {
  event_type: WebhookEvent;
  data: WebhookPayload;
};

export type SendProjectWebhookInput = {
  projectId: number;
  event: WebhookEvent;
  payload: WebhookPayload;
  notification?: WebhookNotification;
  idempotencyKey?: string;
  timeoutMs?: number;
};

export type WebhookDelivery = {
  ok: boolean;
  status: number | null;
  durationMs: number;
  error: string | null;
};

export type SendProjectWebhookResult =
  | ({ sent: true } & WebhookDelivery)
  | { sent: false; skipReason: WebhookSkipReason };

export type TestProjectWebhookResult = {
  status: number;
  durationMs: number;
};
