import type { RubricRuleValue } from '@/server/rubric/types';

import { BooleanChoice } from '../_constants/boolean-choice';

export const booleanChoiceOf = (value: RubricRuleValue): BooleanChoice => {
  if (value === true) return BooleanChoice.true;
  if (value === false) return BooleanChoice.false;
  return BooleanChoice.none;
};

export const valueOfBooleanChoice = (choice: BooleanChoice) => {
  if (choice === BooleanChoice.true) return true;
  if (choice === BooleanChoice.false) return false;
  return null;
};
