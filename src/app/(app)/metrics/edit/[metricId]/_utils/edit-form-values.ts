import type { MetricDetail } from '@/server/metrics/types';

import type { EditMetricFormInput } from '../_schemas/edit-metric-form-schema';

export const toEditFormValues = (
  metric: MetricDetail,
): EditMetricFormInput => ({
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
