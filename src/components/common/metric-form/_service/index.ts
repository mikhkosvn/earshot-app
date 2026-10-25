export const MetricFormKey = {
  improve: 'improve-metric',
  generateTrigger: 'generate-evaluation-trigger',
} as const;

export type MetricFormKey = (typeof MetricFormKey)[keyof typeof MetricFormKey];

export class MetricFormService {
  static readonly improveMutationKey = [MetricFormKey.improve];
  static readonly generateTriggerMutationKey = [MetricFormKey.generateTrigger];
}
