import type { MetricSnapshot } from '@/server/metrics/types';

export const SNAPSHOT_FIELD_LABELS: Record<keyof MetricSnapshot, string> = {
  type: 'Form',
  name: 'Name',
  slug: 'Slug',
  evalType: 'Metric Type',
  enumValues: 'Enum keys',
  audioEnabled: 'Use voice recording',
  description: 'Description',
  customCode: 'Custom Code',
  configuration: 'Configuration',
  dependencyIds: 'Uses results from',
  evaluationTrigger: 'Evaluation Trigger',
  triggerType: 'Trigger form',
  evaluationTriggerPrompt: 'Evaluation Trigger Prompt',
  evaluationTriggerCustomCode: 'Evaluation Trigger Code',
  addToNewAgents: 'Automatically add to new agents',
};
