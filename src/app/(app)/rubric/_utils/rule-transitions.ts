import type { UseFormReturn } from 'react-hook-form';

import { ComparisonOperator } from '@/generated/prisma/enums';
import {
  RUBRIC_OPERATORS,
  RubricValueKind,
} from '@/server/metrics/constants/rubric/rubric-value-kind';
import type {
  RubricMetricOption,
  RubricRuleValue,
} from '@/server/rubric/types';

import type { RubricFormValues } from '../_schemas/rubric-form-schema';

export const defaultRuleValue = (kind: RubricValueKind): RubricRuleValue => {
  if (kind === RubricValueKind.boolean) return true;
  return null;
};

export const emptyRule = () => ({
  metricId: null,
  operator: ComparisonOperator.eq,
  value: null,
});

export const changeRuleMetric = (
  form: UseFormReturn<RubricFormValues>,
  index: number,
  metric: RubricMetricOption,
) => {
  const options = { shouldDirty: true, shouldValidate: true };
  form.setValue(`rules.${index}.metricId`, metric.id, options);
  form.setValue(
    `rules.${index}.operator`,
    RUBRIC_OPERATORS[metric.kind][0],
    options,
  );
  form.setValue(`rules.${index}.value`, defaultRuleValue(metric.kind), options);
};
