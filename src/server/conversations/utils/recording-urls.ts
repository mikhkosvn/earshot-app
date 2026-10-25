import 'server-only';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

const DOWNLOAD_FLAG = 1;

export const sessionRecordingUrls = (fileId: string | null) => {
  if (!fileId) return { recordingUrl: null, recordingDownloadUrl: null };
  return {
    recordingUrl: UrlGenerator.file({ fileId }),
    recordingDownloadUrl: UrlGenerator.file({
      fileId,
      values: { download: DOWNLOAD_FLAG },
    }),
  };
};

export const shareRecordingUrls = (token: string, fileId: string | null) => {
  if (!fileId) return { recordingUrl: null, recordingDownloadUrl: null };
  return {
    recordingUrl: UrlGenerator.shareFile({ token, fileId }),
    recordingDownloadUrl: UrlGenerator.shareFile({
      token,
      fileId,
      values: { download: DOWNLOAD_FLAG },
    }),
  };
};
