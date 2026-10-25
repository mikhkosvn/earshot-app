'use client';

import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';

import { useRuleMetric } from '../../../_hooks/use-rule-metric';
import { RubricBooleanValueField } from './rubric-boolean-value-field';
import { RubricEmptyValueField } from './rubric-empty-value-field';
import { RubricEnumValueField } from './rubric-enum-value-field';
import { RubricNumberValueField } from './rubric-number-value-field';

type RubricValueFieldProps = {
  index: number;
};

export function RubricValueField({ index }: RubricValueFieldProps) {
  const metric = useRuleMetric(index);

  if (!metric) return <RubricEmptyValueField index={index} />;
  if (metric.kind === RubricValueKind.boolean) {
    return <RubricBooleanValueField index={index} />;
  }
  if (metric.kind === RubricValueKind.enum) {
    return <RubricEnumValueField index={index} />;
  }
  return <RubricNumberValueField index={index} />;
}
