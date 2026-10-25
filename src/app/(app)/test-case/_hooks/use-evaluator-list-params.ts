'use client';

import { useQueryStates } from 'nuqs';

import { evaluatorListParams } from '@/app/(app)/test-case/_constants/evaluator-list-params';

export const useEvaluatorListParams = () => useQueryStates(evaluatorListParams);
