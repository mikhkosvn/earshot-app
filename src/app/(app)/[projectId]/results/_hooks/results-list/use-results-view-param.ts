'use client';

import { useQueryStates } from 'nuqs';

import type { ResultsView } from '@/lib/url-generator/constants';

import { resultsListParsers } from '../../_constants/result-params';

const viewParsers = {
  view: resultsListParsers.view,
  page: resultsListParsers.page,
};

export const useResultsViewParam = () => {
  const [{ view }, setValues] = useQueryStates(viewParsers, {
    clearOnDefault: false,
  });

  const setView = (next: ResultsView) => setValues({ view: next, page: 1 });

  return { view, setView };
};
