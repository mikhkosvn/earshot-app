import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { readResponseError } from '@/server/common/logging/errors/read-response-error';
import {
  recordExternalCall,
  recordExternalError,
} from '@/server/common/logging/event-fields';
import {
  WEBHOOK_EVENT_HEADER,
  WEBHOOK_IDEMPOTENCY_HEADER,
  WEBHOOK_SECRET_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMEOUT_MS,
  WEBHOOK_USER_AGENT,
  WebhookOperation,
} from '@/server/project-webhooks/constants/webhook-delivery';
import type {
  WebhookBody,
  WebhookDelivery,
} from '@/server/project-webhooks/types';

import { signWebhookBody } from './sign-webhook-body';

interface DeliverWebhookInput {
  url: string;
  secret: string | null;
  body: WebhookBody;
  idempotencyKey?: string;
  timeoutMs?: number;
}

const WEBHOOK_CALL = {
  service: ExternalService.webhook,
  operation: WebhookOperation.deliver,
  attempt: 1,
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

const describeFailure = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'The endpoint did not answer within the time limit.';
  }
  if (error instanceof Error) return error.message;
  return 'The request failed.';
};

const finishResponse = async (response: Response) => {
  if (response.ok) {
    await response.body?.cancel();
    return;
  }
  recordExternalError(await readResponseError(response, WEBHOOK_CALL));
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
    const durationMs = Math.round(performance.now() - startedAt);
    recordExternalCall({
      ...WEBHOOK_CALL,
      status_code: response.status,
      duration_ms: durationMs,
    });
    await finishResponse(response);
    return {
      ok: response.ok,
      status: response.status,
      durationMs,
      error: null,
    };
  } catch (error) {
    const durationMs = Math.round(performance.now() - startedAt);
    recordExternalCall({ ...WEBHOOK_CALL, duration_ms: durationMs });
    recordExternalError(
      new ExternalCallError(
        { ...WEBHOOK_CALL, message: describeFailure(error), retriable: true },
        { cause: error },
      ),
    );
    return {
      ok: false,
      status: null,
      durationMs,
      error: describeFailure(error),
    };
  }
};
