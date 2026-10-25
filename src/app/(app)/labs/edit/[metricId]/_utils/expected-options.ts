import { MetricEvalType } from '@/generated/prisma/enums';
import type { MetricValue } from '@/server/metrics/types';

import { NOT_APPLICABLE_TEXT } from './value-text';

export type ExpectedOption = {
  key: string;
  label: string;
  value: MetricValue;
};

const NOT_APPLICABLE_KEY = 'na';

const notApplicable: ExpectedOption = {
  key: NOT_APPLICABLE_KEY,
  label: NOT_APPLICABLE_TEXT,
  value: null,
};

export const expectedOptions = (
  evalType: MetricEvalType,
  enumValues: string[],
): ExpectedOption[] | null => {
  if (evalType === MetricEvalType.binary) {
    return [
      notApplicable,
      { key: 'true', label: 'True', value: true },
      { key: 'false', label: 'False', value: false },
    ];
  }
  if (evalType === MetricEvalType.enum) {
    return [
      notApplicable,
      ...enumValues.map((value) => ({
        key: `enum-${value}`,
        label: value,
        value,
      })),
    ];
  }
  return null;
};

export const expectedKeyOf = (
  options: ExpectedOption[],
  value: MetricValue | undefined,
) =>
  options.find((option) => option.value === value)?.key ?? NOT_APPLICABLE_KEY;

export const numberInputOf = (value: MetricValue | undefined) => {
  if (typeof value === 'number') return String(value);
  return '';
};

export const numberValueOf = (input: HTMLInputElement): MetricValue => {
  if (input.value === '') return null;
  return input.valueAsNumber;
};
