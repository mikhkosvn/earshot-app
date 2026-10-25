export const MonitorRunOutcome = {
  success: 'success',
  failure: 'failure',
} as const;

export type MonitorRunOutcome =
  (typeof MonitorRunOutcome)[keyof typeof MonitorRunOutcome];
