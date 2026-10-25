'use client';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { AGENT_SEARCH_PARAM } from '../../_constants/agent-list-params';

const searchParsers = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger,
};

export const useAgentSearchParam = () => {
  const [{ search }, setValues] = useQueryStates(searchParsers, {
    urlKeys: { search: AGENT_SEARCH_PARAM },
  });

  const setSearch = (value: string) =>
    setValues({ search: value.trim(), page: null });

  return { search, setSearch };
};
