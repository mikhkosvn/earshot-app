export const SampleSource = {
  run: 'run',
  call_log: 'call_log',
  conversation: 'conversation',
} as const;

export type SampleSource = (typeof SampleSource)[keyof typeof SampleSource];

export const SampleSourceLabel: Record<SampleSource, string> = {
  [SampleSource.run]: 'run',
  [SampleSource.call_log]: 'call',
  [SampleSource.conversation]: 'conversation',
};
