'use client';

import type { CorrectionOption } from '../../_utils/correction-options';
import { CorrectMetricNumberField } from './correct-metric-number-field';
import { CorrectMetricOptionField } from './correct-metric-option-field';

type CorrectMetricFieldInputProps = {
  options: CorrectionOption[] | null;
};

export function CorrectMetricFieldInput({
  options,
}: CorrectMetricFieldInputProps) {
  if (!options) return <CorrectMetricNumberField />;
  return <CorrectMetricOptionField options={options} />;
}
