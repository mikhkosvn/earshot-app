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
import type { TranscriptionFile } from '@/server/transcription/types';

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

export const downloadRecording = async (
  recordingUrl: string,
): Promise<TranscriptionFile> => {
  const url = new URL(recordingUrl);
  const response = await fetch(url, {
    signal: AbortSignal.timeout(RECORDING_DOWNLOAD_TIMEOUT_MS),
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error(
      `The recording URL answered with status ${response.status}.`,
    );
  }
  const fileName = fileNameOf(url);
  return {
    data: await readLimited(response),
    contentType: contentTypeOf(response, fileName),
    fileName,
  };
};
