export const CallLogStep = {
  recording_download: 'call_logs.recording_download',
  webhook_delivery: 'call_logs.webhook_delivery',
} as const;

export type CallLogStep = (typeof CallLogStep)[keyof typeof CallLogStep];

export const CallLogOperation = {
  download_recording: 'call_logs.download_recording',
} as const;

export type CallLogOperation =
  (typeof CallLogOperation)[keyof typeof CallLogOperation];
