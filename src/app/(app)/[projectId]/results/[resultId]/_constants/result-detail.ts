export const RESULT_STATUS_POLL_MS = 3000;

export const PERCENT_SCALE = 100;

export const LOW_PERCENT_LIMIT = 50;

export const EMPTY_VALUE = '—';

export const MetricRunTab = {
  failure: 'failure',
  success: 'success',
} as const;

export type MetricRunTab = (typeof MetricRunTab)[keyof typeof MetricRunTab];

export const GAUGE_ARC_PATH = 'M 10 74 A 60 60 0 0 1 130 74';

export const METRIC_TILE_CLASS =
  'flex min-h-10 w-full items-center gap-3 rounded-md border bg-background px-3 py-2 text-left text-sm';
