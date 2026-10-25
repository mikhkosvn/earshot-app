'use client';

import { BooleanPassValue } from '@/server/insights/constants/pass-condition';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';

import { useSelectedInsightMetric } from '../../../_hooks/forms/use-selected-insight-metric';
import { PassValueInput } from './pass-value-input';
import { PassValueSelect } from './pass-value-select';

const BOOLEAN_VALUES = Object.values(BooleanPassValue);

export function PassValueControl() {
  const metric = useSelectedInsightMetric();

  if (metric?.kind === RubricValueKind.boolean) {
    return <PassValueSelect values={BOOLEAN_VALUES} />;
  }
  if (metric?.kind === RubricValueKind.enum) {
    return <PassValueSelect values={metric.enumValues} />;
  }
  return <PassValueInput disabled={!metric} />;
}
