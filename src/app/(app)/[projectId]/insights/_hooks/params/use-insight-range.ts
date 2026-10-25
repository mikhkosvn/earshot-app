'use client';

import { useQueryStates } from 'nuqs';

import { insightsParsers } from '../../_constants/insights-params';

const rangeParsers = { from: insightsParsers.from, to: insightsParsers.to };

export const useInsightRange = () => {
  const [{ from, to }, setValues] = useQueryStates(rangeParsers);

  const setRange = (range: { from: string; to: string }) => setValues(range);

  return { from, to, setRange };
};
