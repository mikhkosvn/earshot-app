export const CallUploadFormat = {
  mp3: 'mp3',
  mp4: 'mp4',
  wav: 'wav',
  ogg: 'ogg',
} as const;

export type CallUploadFormat =
  (typeof CallUploadFormat)[keyof typeof CallUploadFormat];

export const CALL_UPLOAD_CONTENT_TYPE: Record<CallUploadFormat, string> = {
  [CallUploadFormat.mp3]: 'audio/mpeg',
  [CallUploadFormat.mp4]: 'audio/mp4',
  [CallUploadFormat.wav]: 'audio/wav',
  [CallUploadFormat.ogg]: 'audio/ogg',
};

export const CALL_UPLOAD_ACCEPT = Object.values(CallUploadFormat)
  .map((format) => `.${format}`)
  .join(',');

export const callUploadFormatOf = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  return Object.values(CallUploadFormat).find((format) => format === extension);
};
