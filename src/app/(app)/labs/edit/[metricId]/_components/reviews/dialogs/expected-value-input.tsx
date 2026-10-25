'use client';

import { useLabMetric } from '../../../_hooks/lab/use-lab-metric';
import { expectedOptions } from '../../../_utils/expected-options';
import { ExpectedNumberField } from './expected-number-field';
import { ExpectedOptionField } from './expected-option-field';

export function ExpectedValueInput() {
  const metric = useLabMetric();
  const options = expectedOptions(metric.evalType, metric.enumValues);

  if (!options) return <ExpectedNumberField />;
  return <ExpectedOptionField options={options} />;
}
