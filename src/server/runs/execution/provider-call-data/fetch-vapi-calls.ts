import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { readResponseError } from '@/server/common/logging/errors/read-response-error';
import { recordExternalCall } from '@/server/common/logging/event-fields';
import {
  VAPI_API_URL,
  VAPI_CALL_LIST_LIMIT,
  VAPI_CALLS_PATH,
  VAPI_REQUEST_TIMEOUT_MS,
  VapiOperation,
} from '@/server/runs/constants/provider-call-data';
import { vapiCallListSchema } from '@/server/runs/schemas/vapi-call';

interface FetchVapiCallsArgs {
  apiKey: string;
  createdAtGe: Date;
  createdAtLe: Date;
  attempt: number;
}

const vapiCallFields = (attempt: number) => ({
  service: ExternalService.vapi,
  operation: VapiOperation.list_calls,
  attempt,
});

const describeFetchFailure = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const listUrlOf = ({ createdAtGe, createdAtLe }: FetchVapiCallsArgs) => {
  const url = new URL(VAPI_CALLS_PATH, VAPI_API_URL);
  url.searchParams.set('createdAtGe', createdAtGe.toISOString());
  url.searchParams.set('createdAtLe', createdAtLe.toISOString());
  url.searchParams.set('limit', String(VAPI_CALL_LIST_LIMIT));
  return url;
};

const sendListRequest = async (args: FetchVapiCallsArgs) => {
  const call = vapiCallFields(args.attempt);
  try {
    return await fetch(listUrlOf(args), {
      headers: { Authorization: `Bearer ${args.apiKey}` },
      signal: AbortSignal.timeout(VAPI_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new ExternalCallError(
      { ...call, message: describeFetchFailure(error), retriable: true },
      { cause: error },
    );
  }
};

export const fetchVapiCalls = async (args: FetchVapiCallsArgs) => {
  const call = vapiCallFields(args.attempt);
  const startedMs = performance.now();
  const response = await sendListRequest(args);
  recordExternalCall({
    ...call,
    status_code: response.status,
    duration_ms: Math.round(performance.now() - startedMs),
  });
  if (!response.ok) throw await readResponseError(response, call);
  const body: unknown = await response.json().catch(() => null);
  const parsed = vapiCallListSchema.safeParse(body);
  if (!parsed.success) {
    throw new ExternalCallError({
      ...call,
      message: 'Vapi sent a call list that is not valid.',
      status_code: response.status,
    });
  }
  return parsed.data;
};
