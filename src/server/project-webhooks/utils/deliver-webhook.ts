import 'server-only';

import {
  WEBHOOK_EVENT_HEADER,
  WEBHOOK_IDEMPOTENCY_HEADER,
  WEBHOOK_SECRET_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMEOUT_MS,
  WEBHOOK_USER_AGENT,
} from '@/server/project-webhooks/constants/webhook-delivery';
import type {
  WebhookBody,
  WebhookDelivery,
} from '@/server/project-webhooks/types';

import { signWebhookBody } from './sign-webhook-body';

type DeliverWebhookInput = {
  url: string;
  secret: string | null;
  body: WebhookBody;
  idempotencyKey?: string;
  timeoutMs?: number;
};

const buildHeaders = (
  json: string,
  { secret, body, idempotencyKey }: DeliverWebhookInput,
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'User-Agent': WEBHOOK_USER_AGENT,
    [WEBHOOK_EVENT_HEADER]: body.event_type,
  });
  if (secret) {
    headers.set(WEBHOOK_SECRET_HEADER, secret);
    headers.set(WEBHOOK_SIGNATURE_HEADER, signWebhookBody(json, secret));
  }
  if (idempotencyKey) headers.set(WEBHOOK_IDEMPOTENCY_HEADER, idempotencyKey);
  return headers;
};

const describeError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'The endpoint did not answer within the time limit.';
  }
  if (error instanceof Error) return error.message;
  return 'The request failed.';
};

export const deliverWebhook = async (
  input: DeliverWebhookInput,
): Promise<WebhookDelivery> => {
  const json = JSON.stringify(input.body);
  const startedAt = performance.now();
  try {
    const response = await fetch(input.url, {
      method: 'POST',
      headers: buildHeaders(json, input),
      body: json,
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(input.timeoutMs ?? WEBHOOK_TIMEOUT_MS),
    });
    await response.body?.cancel();
    return {
      ok: response.ok,
      status: response.status,
      durationMs: Math.round(performance.now() - startedAt),
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      durationMs: Math.round(performance.now() - startedAt),
      error: describeError(error),
    };
  }
};
