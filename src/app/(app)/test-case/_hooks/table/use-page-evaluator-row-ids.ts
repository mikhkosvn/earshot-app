'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useEvaluatorListQuery } from '../use-evaluator-list-query';

export const usePageEvaluatorRowIds = () => {
  const { data } = useSuspenseQuery(useEvaluatorListQuery());
  return data.rows.map((row) => String(row.id));
};
