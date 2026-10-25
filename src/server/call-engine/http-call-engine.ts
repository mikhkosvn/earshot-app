import 'server-only';

import {
  CALL_SERVICE_CALLS_PATH,
  CALL_SERVICE_TIMEOUT_MS,
} from '@/server/call-engine/constants';
import { startCallResponseSchema } from '@/server/call-engine/schemas';
import type {
  CallEngine,
  StartCallRequest,
  StartedCall,
} from '@/server/call-engine/types';

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
    throw new Error('The call service sent a response that is not valid.');
  }
  return { providerCallId: parsed.data.provider_call_id };
};

const startHttpCall = async (
  request: StartCallRequest,
): Promise<StartedCall> => {
  const { url, apiKey } = readCallServiceConfig();
  const response = await fetch(`${url}${CALL_SERVICE_CALLS_PATH}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(CALL_SERVICE_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(
      `The call service answered with status ${response.status}.`,
    );
  }
  return readStartedCall(response);
};

export const httpCallEngine: CallEngine = {
  startCall: startHttpCall,
};
