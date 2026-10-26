import 'server-only';

import { SERVICE_REQUEST_ID_HEADERS } from '../constants';
import type { ExternalCallFields } from '../types';
import { ExternalCallError } from './external-call-error';

const readServiceRequestId = (headers: Headers) => {
  for (const name of SERVICE_REQUEST_ID_HEADERS) {
    const value = headers.get(name);
    if (value) return value;
  }
  return undefined;
};

const readBody = async (response: Response) => {
  try {
    return await response.text();
  } catch {
    return undefined;
  }
};

export const readResponseError = async (
  response: Response,
  call: Omit<ExternalCallFields, 'status_code' | 'duration_ms'>,
  message = `${response.status} ${response.statusText}`.trim(),
) =>
  new ExternalCallError({
    service: call.service,
    operation: call.operation,
    attempt: call.attempt,
    message,
    status_code: response.status,
    service_request_id: readServiceRequestId(response.headers),
    response: await readBody(response),
  });
