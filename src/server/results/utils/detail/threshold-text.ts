import type { ComparisonOperator } from '@/generated/prisma/enums';
import { ComparisonOperatorLabel } from '@/server/metrics/constants/comparison-operator-labels';

type StoredRule = {
  operator: ComparisonOperator;
  numberValue: number | null;
  booleanValue: boolean | null;
  textValues: string[];
};

const booleanText = (value: boolean) => {
  if (value) return 'True';
  return 'False';
};

const ruleValueText = (rule: StoredRule) => {
  if (rule.numberValue !== null) return String(rule.numberValue);
  if (rule.booleanValue !== null) return booleanText(rule.booleanValue);
  return rule.textValues.join(', ');
};

export const thresholdText = (rule: StoredRule | null) => {
  if (!rule) return null;
  return `${ComparisonOperatorLabel[rule.operator]} ${ruleValueText(rule)}`;
};
