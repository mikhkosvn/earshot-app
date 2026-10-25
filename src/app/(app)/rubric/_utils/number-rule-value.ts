import type { RubricRuleValue } from '@/server/rubric/types';

export const numberInputValue = (value: RubricRuleValue) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '';
  return String(value);
};

export const numberRuleValue = (text: string) => {
  if (text.trim() === '') return null;
  return Number(text);
};
