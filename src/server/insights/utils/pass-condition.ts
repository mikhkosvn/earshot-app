import 'server-only';

import {
  ComparisonOperator,
  type MetricEvalType,
} from '@/generated/prisma/enums';
import { conditionPasses } from '@/server/alerts/utils/condition-passes';
import {
  type EvaluationValueParts,
  evaluationValueOf,
} from '@/server/alerts/utils/evaluation-value';
import { ActionError } from '@/server/common/run-action';
import {
  BooleanPassValue,
  DEFAULT_PASS_NUMBER,
  PASS_OPERATORS,
} from '@/server/insights/constants/pass-condition';
import type { PassCondition } from '@/server/insights/types';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import type { RubricRuleValue } from '@/server/rubric/types';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';

export type StoredPass = {
  passOperator: ComparisonOperator;
  passNumberValue: number | null;
  passBooleanValue: boolean | null;
  passTextValues: string[];
};

export const passKindOf = (metric: {
  evalType: MetricEvalType;
  predefinedMetric: { functionName: string | null } | null;
}) =>
  rubricValueKind({
    evalType: metric.evalType,
    functionName: metric.predefinedMetric?.functionName ?? null,
  });

export const defaultPassOf = (
  evalType: MetricEvalType,
  kind: RubricValueKind,
  enumValues: string[],
): PassCondition => {
  if (kind === RubricValueKind.boolean) {
    return { operator: ComparisonOperator.eq, value: BooleanPassValue.true };
  }
  if (kind === RubricValueKind.enum) {
    return { operator: ComparisonOperator.eq, value: enumValues[0] ?? '' };
  }
  return {
    operator: ComparisonOperator.gte,
    value: String(DEFAULT_PASS_NUMBER[evalType]),
  };
};

const storedValueText = (kind: RubricValueKind, stored: StoredPass) => {
  if (kind === RubricValueKind.boolean) {
    return String(stored.passBooleanValue ?? true);
  }
  if (kind === RubricValueKind.enum) return stored.passTextValues[0] ?? '';
  return String(stored.passNumberValue ?? 0);
};

export const passConditionOf = (
  kind: RubricValueKind,
  stored: StoredPass,
): PassCondition => ({
  operator: stored.passOperator,
  value: storedValueText(kind, stored),
});

const invalid = (message: string) => new ActionError(message, 422);

export const storedPassOf = (
  kind: RubricValueKind,
  pass: PassCondition,
): StoredPass => {
  if (!PASS_OPERATORS[kind].includes(pass.operator)) {
    throw invalid('Select an operator that fits this metric.');
  }
  const empty = {
    passOperator: pass.operator,
    passNumberValue: null,
    passBooleanValue: null,
    passTextValues: [],
  };
  if (kind === RubricValueKind.boolean) {
    if (
      pass.value !== BooleanPassValue.true &&
      pass.value !== BooleanPassValue.false
    ) {
      throw invalid('Select true or false.');
    }
    return { ...empty, passBooleanValue: pass.value === BooleanPassValue.true };
  }
  if (kind === RubricValueKind.enum) {
    return { ...empty, passTextValues: [pass.value] };
  }
  const value = Number(pass.value);
  if (!Number.isFinite(value)) throw invalid('Enter a number.');
  return { ...empty, passNumberValue: value };
};

const expectedOf = (
  kind: RubricValueKind,
  stored: StoredPass,
): RubricRuleValue => {
  if (kind === RubricValueKind.boolean) return stored.passBooleanValue;
  if (kind === RubricValueKind.enum) {
    if (stored.passTextValues.length === 0) return null;
    return stored.passTextValues;
  }
  return stored.passNumberValue;
};

export const isInsightFailure = (
  kind: RubricValueKind,
  stored: StoredPass,
  parts: EvaluationValueParts,
) => {
  const value = evaluationValueOf(parts);
  const expected = expectedOf(kind, stored);
  if (value === null || expected === null) return false;
  return !conditionPasses(kind, stored.passOperator, value, expected);
};
