'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { callListParsers } from '../../_constants/call-list-params';

const searchParsers = { search: callListParsers.search, page: parseAsInteger };

export const useCallSearchParam = () => {
  const [{ search }, setValues] = useQueryStates(searchParsers);

  const setSearch = (value: string) =>
    setValues({ search: value.trim(), page: null });

  return { search, setSearch };
};
