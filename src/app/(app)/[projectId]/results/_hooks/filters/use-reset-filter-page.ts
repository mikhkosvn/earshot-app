'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

export const useResetFilterPage = (pageParamKey: string) => {
  const [, setPage] = useQueryState(
    pageParamKey,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false }),
  );
  return () => setPage(1);
};
