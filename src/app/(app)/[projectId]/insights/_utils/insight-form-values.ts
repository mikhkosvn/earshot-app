import type { UseFormReturn } from 'react-hook-form';

import { ComparisonOperator, MetricEvalType } from '@/generated/prisma/enums';
import { DEFAULT_PASS_NUMBER } from '@/server/insights/constants/pass-condition';
import type {
  InsightMetricOption,
  SaveInsightConfigInput,
} from '@/server/insights/types';

const passOf = (metric: InsightMetricOption) =>
  metric.config?.pass ?? metric.defaultPass;

export const insightFormValuesOf = (
  projectId: number,
  metric: InsightMetricOption | null,
): SaveInsightConfigInput => {
  if (!metric) {
    return {
      projectId,
      metricId: 0,
      passOperator: ComparisonOperator.gte,
      passValue: String(
        DEFAULT_PASS_NUMBER[MetricEvalType.continuous_qualitative],
      ),
      triageFailureLimit: null,
    };
  }
  const pass = passOf(metric);
  return {
    projectId,
    metricId: metric.id,
    passOperator: pass.operator,
    passValue: pass.value,
    triageFailureLimit: metric.config?.triageFailureLimit ?? null,
  };
};

export const selectInsightMetric = (
  form: UseFormReturn<SaveInsightConfigInput>,
  metric: InsightMetricOption,
) => {
  const values = insightFormValuesOf(form.getValues('projectId'), metric);
  form.reset(values, { keepDefaultValues: true });
  form.setValue('metricId', metric.id, {
    shouldDirty: true,
    shouldValidate: true,
  });
};
