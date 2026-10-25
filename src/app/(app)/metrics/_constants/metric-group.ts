export const MetricGroup = {
  custom: 'custom',
  predefined: 'predefined',
} as const;

export type MetricGroup = (typeof MetricGroup)[keyof typeof MetricGroup];

export const MetricGroupLabel: Record<MetricGroup, string> = {
  [MetricGroup.custom]: 'Custom Metrics',
  [MetricGroup.predefined]: 'Predefined Metrics',
};
