'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { DEFAULT_PAGE_SIZE } from './pagination-config';

const paginationParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

export const usePaginationParams = (pageParamKey: string) => {
  const [{ page, pageSize }, setValues] = useQueryStates(paginationParsers, {
    urlKeys: { page: pageParamKey },
    clearOnDefault: false,
  });

  const setPage = (nextPage: number) => setValues({ page: nextPage });
  const setPageSize = (nextPageSize: number) =>
    setValues({ page: 1, pageSize: nextPageSize });

  return { page, pageSize, setPage, setPageSize };
};
