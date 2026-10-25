export const MetricRowDialog = {
  samplingRate: 'sampling_rate',
  delete: 'delete',
} as const;

export type MetricRowDialog =
  (typeof MetricRowDialog)[keyof typeof MetricRowDialog];
