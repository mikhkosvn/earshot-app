import {
  LEGACY_FAIL_SCORE,
  LEGACY_PASS_SCORE,
  RubricValueKind,
} from '@/server/metrics/constants/rubric/rubric-value-kind';
import type { RubricRuleValue } from '@/server/rubric/types';

type StoredRuleValue = {
  numberValue: number | null;
  booleanValue: boolean | null;
  textValues: string[];
};

const legacyBoolean = (value: number | null) => {
  if (value === LEGACY_PASS_SCORE) return true;
  if (value === LEGACY_FAIL_SCORE) return false;
  return null;
};

export const ruleValueOf = (
  kind: RubricValueKind,
  stored: StoredRuleValue,
): RubricRuleValue => {
  if (kind === RubricValueKind.boolean) {
    return stored.booleanValue ?? legacyBoolean(stored.numberValue);
  }
  if (kind === RubricValueKind.enum) {
    if (stored.textValues.length === 0) return null;
    return stored.textValues;
  }
  return stored.numberValue;
};

export const storedRuleValue = (value: RubricRuleValue): StoredRuleValue => {
  if (typeof value === 'boolean') {
    return { numberValue: null, booleanValue: value, textValues: [] };
  }
  if (typeof value === 'number') {
    return { numberValue: value, booleanValue: null, textValues: [] };
  }
  if (Array.isArray(value)) {
    return { numberValue: null, booleanValue: null, textValues: value };
  }
  return { numberValue: null, booleanValue: null, textValues: [] };
};
