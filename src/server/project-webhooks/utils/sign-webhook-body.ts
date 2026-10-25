import 'server-only';

import { createHmac } from 'node:crypto';

import { WEBHOOK_SIGNATURE_PREFIX } from '@/server/project-webhooks/constants/webhook-delivery';

export const signWebhookBody = (body: string, secret: string) =>
  `${WEBHOOK_SIGNATURE_PREFIX}${createHmac('sha256', secret).update(body).digest('hex')}`;
