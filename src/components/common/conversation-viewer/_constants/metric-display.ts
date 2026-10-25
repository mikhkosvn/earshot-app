export const MetricDisplayKind = {
  status: 'status',
  none: 'none',
  empty: 'empty',
  passed: 'passed',
  failed: 'failed',
  percent: 'percent',
  number: 'number',
  text: 'text',
} as const;

export type MetricDisplayKind =
  (typeof MetricDisplayKind)[keyof typeof MetricDisplayKind];
