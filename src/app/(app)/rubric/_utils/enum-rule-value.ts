import type { RubricRuleValue } from '@/server/rubric/types';

export const enumSelection = (value: RubricRuleValue) => {
  if (Array.isArray(value)) return value;
  return [];
};

export const enumRuleValue = (selection: string[]) => {
  if (selection.length === 0) return null;
  return selection;
};
