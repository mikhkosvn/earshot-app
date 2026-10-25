import 'server-only';

import {
  RECORDING_CONTENT_TYPE,
  RECORDING_DOWNLOAD_TIMEOUT_MS,
} from '@/server/call-engine/constants';
import type { RecordingFile } from '@/server/call-engine/types';

const contentTypeOf = (response: Response) => {
  const value = response.headers.get('content-type')?.split(';')[0]?.trim();
  if (!value) return RECORDING_CONTENT_TYPE;
  return value;
};

export const downloadRecording = async (
  url: string,
): Promise<RecordingFile> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(RECORDING_DOWNLOAD_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(
      `The recording download failed with status ${response.status}.`,
    );
  }
  return {
    data: new Uint8Array(await response.arrayBuffer()),
    contentType: contentTypeOf(response),
  };
};
