export const MONITOR_SCHEDULER_INTERVAL_MS = 30_000;

export const MONITOR_CLAIM_LIMIT = 20;

export const MONITOR_RUN_START_TIMEOUT_MS = 10 * 60 * 1000;

export const MonitorStep = {
  run_start: 'monitors.run_start',
  run_email: 'monitors.run_email',
} as const;

export type MonitorStep = (typeof MonitorStep)[keyof typeof MonitorStep];
