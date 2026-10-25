import 'server-only';

import path from 'node:path';

import {
  RECORDING_DOWNLOAD_TIMEOUT_MS,
  RECORDING_MAX_BYTES,
} from '@/server/call-logs/constants/call-log-limits';
import {
  CALL_UPLOAD_CONTENT_TYPE,
  callUploadFormatOf,
} from '@/server/call-logs/constants/call-upload-format';
import { CallLogOperation } from '@/server/call-logs/constants/call-log-step';
import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { readResponseError } from '@/server/common/logging/errors/read-response-error';
import {
  addEventFields,
  recordExternalCall,
} from '@/server/common/logging/event-fields';
import type { TranscriptionFile } from '@/server/transcription/types';

const RECORDING_DOWNLOAD_CALL = {
  service: ExternalService.file_storage,
  operation: CallLogOperation.download_recording,
  attempt: 1,
};

const DEFAULT_CONTENT_TYPE = 'application/octet-stream';
const DEFAULT_FILE_NAME = 'recording';

const fileNameOf = (url: URL) =>
  path.posix.basename(url.pathname) || DEFAULT_FILE_NAME;

const contentTypeOf = (response: Response, fileName: string) => {
  const header = response.headers.get('content-type')?.split(';')[0]?.trim();
  if (header && header !== DEFAULT_CONTENT_TYPE) return header;
  const format = callUploadFormatOf(fileName);
  if (format) return CALL_UPLOAD_CONTENT_TYPE[format];
  return header || DEFAULT_CONTENT_TYPE;
};

const readLimited = async (response: Response) => {
  const declared = Number(response.headers.get('content-length') ?? 0);
  if (declared > RECORDING_MAX_BYTES) {
    throw new Error('The recording is larger than 500MB.');
  }
  if (!response.body) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  const reader = response.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > RECORDING_MAX_BYTES) {
      await reader.cancel();
      throw new Error('The recording is larger than 500MB.');
    }
    chunks.push(value);
  }
  const data = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return data;
};

const describeFetchFailure = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const sendDownload = async (url: URL) => {
  try {
    return await fetch(url, {
      signal: AbortSignal.timeout(RECORDING_DOWNLOAD_TIMEOUT_MS),
      redirect: 'follow',
    });
  } catch (error) {
    throw new ExternalCallError(
      {
        ...RECORDING_DOWNLOAD_CALL,
        message: describeFetchFailure(error),
        retriable: true,
      },
      { cause: error },
    );
  }
};

const recordDownload = (response: Response, startedMs: number) =>
  recordExternalCall({
    ...RECORDING_DOWNLOAD_CALL,
    status_code: response.status,
    duration_ms: Math.round(performance.now() - startedMs),
  });

export const downloadRecording = async (
  recordingUrl: string,
): Promise<TranscriptionFile> => {
  const url = new URL(recordingUrl);
  const startedMs = performance.now();
  const response = await sendDownload(url);
  if (!response.ok) {
    recordDownload(response, startedMs);
    const responseError = await readResponseError(
      response,
      RECORDING_DOWNLOAD_CALL,
    );
    throw new ExternalCallError(
      {
        ...responseError.fields,
        message: `The recording URL answered with status ${response.status}.`,
      },
      { cause: responseError },
    );
  }
  const fileName = fileNameOf(url);
  const data = await readLimited(response).finally(() =>
    recordDownload(response, startedMs),
  );
  addEventFields({ recording: { size_bytes: data.byteLength } });
  return {
    data,
    contentType: contentTypeOf(response, fileName),
    fileName,
  };
};
