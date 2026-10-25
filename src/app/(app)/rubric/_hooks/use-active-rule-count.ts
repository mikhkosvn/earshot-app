'use client';

import { useWatch } from 'react-hook-form';

import type { RubricFormValues } from '../_schemas/rubric-form-schema';

export const useActiveRuleCount = () => {
  const rules = useWatch<RubricFormValues, 'rules'>({ name: 'rules' });
  return rules.filter((rule) => rule.value !== null).length;
};
