import type { LabDraft } from '@/server/labs/types';
import type { MetricDetail } from '@/server/metrics/types';

import type { LabMetricFormInput } from '../_schemas/lab-metric-form-schema';

export const toLabFormValues = (metric: MetricDetail): LabMetricFormInput => ({
  type: metric.type,
  name: metric.name,
  slug: metric.slug,
  evalType: metric.evalType,
  enumValues: metric.enumValues,
  audioEnabled: metric.audioEnabled,
  description: metric.description,
  customCode: metric.customCode,
  configuration: metric.configuration,
  dependencyIds: metric.dependencyIds,
  evaluationTrigger: metric.evaluationTrigger,
  triggerType: metric.triggerType,
  evaluationTriggerPrompt: metric.evaluationTriggerPrompt,
  evaluationTriggerCustomCode: metric.evaluationTriggerCustomCode,
  addToNewAgents: metric.addToNewAgents,
});

export const toLabDraft = (values: LabMetricFormInput): LabDraft => ({
  type: values.type,
  description: values.description,
  customCode: values.customCode,
  evaluationTrigger: values.evaluationTrigger,
  triggerType: values.triggerType,
  evaluationTriggerPrompt: values.evaluationTriggerPrompt,
  evaluationTriggerCustomCode: values.evaluationTriggerCustomCode,
});
