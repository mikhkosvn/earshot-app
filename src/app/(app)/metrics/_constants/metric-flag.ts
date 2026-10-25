export const MetricFlag = {
  observabilityEnabled: 'observabilityEnabled',
  simulationEnabled: 'simulationEnabled',
  samplingEnabled: 'samplingEnabled',
} as const;

export type MetricFlag = (typeof MetricFlag)[keyof typeof MetricFlag];

export const MetricFlagLabel: Record<MetricFlag, string> = {
  [MetricFlag.observabilityEnabled]: 'Observability',
  [MetricFlag.simulationEnabled]: 'Simulation',
  [MetricFlag.samplingEnabled]: 'Sampling Enabled',
};
