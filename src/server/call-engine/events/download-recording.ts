import 'server-only';

import {
  CallEngineOperation,
  RECORDING_CONTENT_TYPE,
  RECORDING_DOWNLOAD_TIMEOUT_MS,
} from '@/server/call-engine/constants';
import type { RecordingFile } from '@/server/call-engine/types';
import { ExternalService } from '@/server/common/logging/constants';
import { readResponseError } from '@/server/common/logging/errors/read-response-error';
import {
  addEventFields,
  recordExternalCall,
} from '@/server/common/logging/event-fields';

const RECORDING_DOWNLOAD_CALL = {
  service: ExternalService.call_service,
  operation: CallEngineOperation.download_recording,
  attempt: 1,
};

const contentTypeOf = (response: Response) => {
  const value = response.headers.get('content-type')?.split(';')[0]?.trim();
  if (!value) return RECORDING_CONTENT_TYPE;
  return value;
};

export const downloadRecording = async (
  url: string,
): Promise<RecordingFile> => {
  const startedMs = performance.now();
  const response = await fetch(url, {
    signal: AbortSignal.timeout(RECORDING_DOWNLOAD_TIMEOUT_MS),
  });
  if (!response.ok) {
    recordExternalCall({
      ...RECORDING_DOWNLOAD_CALL,
      status_code: response.status,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    throw await readResponseError(response, RECORDING_DOWNLOAD_CALL);
  }
  const data = new Uint8Array(await response.arrayBuffer());
  recordExternalCall({
    ...RECORDING_DOWNLOAD_CALL,
    status_code: response.status,
    duration_ms: Math.round(performance.now() - startedMs),
  });
  addEventFields({ recording: { size_bytes: data.byteLength } });
  return { data, contentType: contentTypeOf(response) };
};
