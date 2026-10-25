'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { callListParsers } from '../../_constants/call-list-params';

const rangeParsers = {
  from: callListParsers.from,
  to: callListParsers.to,
  page: parseAsInteger,
};

export const useCallTimeRangeParam = () => {
  const [{ from, to }, setValues] = useQueryStates(rangeParsers);

  const setRange = (range: { from: string; to: string }) =>
    setValues({ ...range, page: null });

  return { from, to, setRange };
};
