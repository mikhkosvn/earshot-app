import 'server-only';

import {
  CALL_SERVICE_CALLS_PATH,
  CALL_SERVICE_TIMEOUT_MS,
  CallEngineOperation,
} from '@/server/call-engine/constants';
import { startCallResponseSchema } from '@/server/call-engine/schemas';
import type {
  CallEngine,
  StartCallRequest,
  StartedCall,
} from '@/server/call-engine/types';
import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { readResponseError } from '@/server/common/logging/errors/read-response-error';
import { recordExternalCall } from '@/server/common/logging/event-fields';
import { readOutgoingTraceContext } from '@/server/common/logging/trace/read-outgoing-trace-context';

const CALL_SERVICE_CALL = {
  service: ExternalService.call_service,
  operation: CallEngineOperation.start_call,
  attempt: 1,
};

const readCallServiceConfig = () => {
  const url = process.env.CALL_SERVICE_URL?.replace(/\/+$/, '');
  const apiKey = process.env.CALL_SERVICE_API_KEY;
  if (!url || !apiKey) {
    throw new Error('CALL_SERVICE_URL and CALL_SERVICE_API_KEY must be set.');
  }
  return { url, apiKey };
};

const readStartedCall = async (response: Response): Promise<StartedCall> => {
  const body: unknown = await response.json().catch(() => null);
  const parsed = startCallResponseSchema.safeParse(body);
  if (!parsed.success) {
    throw new ExternalCallError({
      ...CALL_SERVICE_CALL,
      message: 'The call service sent a response that is not valid.',
      status_code: response.status,
      response: JSON.stringify(body),
    });
  }
  return { providerCallId: parsed.data.provider_call_id };
};

const describeFetchFailure = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const sendStartCall = async (request: StartCallRequest) => {
  const { url, apiKey } = readCallServiceConfig();
  const traceContext = readOutgoingTraceContext();
  try {
    return await fetch(`${url}${CALL_SERVICE_CALLS_PATH}`, {
      method: 'POST',
      headers: {
        ...traceContext,
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...request, trace_context: traceContext }),
      signal: AbortSignal.timeout(CALL_SERVICE_TIMEOUT_MS),
    });
  } catch (error) {
    throw new ExternalCallError(
      {
        ...CALL_SERVICE_CALL,
        message: describeFetchFailure(error),
        retriable: true,
      },
      { cause: error },
    );
  }
};

const startHttpCall = async (
  request: StartCallRequest,
): Promise<StartedCall> => {
  const startedMs = performance.now();
  const response = await sendStartCall(request);
  recordExternalCall({
    ...CALL_SERVICE_CALL,
    status_code: response.status,
    duration_ms: Math.round(performance.now() - startedMs),
  });
  if (!response.ok) {
    throw await readResponseError(response, CALL_SERVICE_CALL);
  }
  return readStartedCall(response);
};

export const httpCallEngine: CallEngine = {
  startCall: startHttpCall,
};
