'use client';

import { debounce, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

const SEARCH_DEBOUNCE_MS = 300;

const searchParsers = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger,
};

export const useSearchParam = (paramKey: string) => {
  const [{ search }, setValues] = useQueryStates(searchParsers, {
    urlKeys: { search: paramKey },
  });

  const setSearch = (value: string) =>
    setValues(
      { search: value, page: null },
      { limitUrlUpdates: debounce(SEARCH_DEBOUNCE_MS) },
    );

  return { search, setSearch };
};
