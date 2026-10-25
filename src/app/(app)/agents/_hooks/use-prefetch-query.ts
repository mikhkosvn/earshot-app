'use client';

import {
  noop,
  type QueryKey,
  useQueryClient,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export const usePrefetchQuery = () => {
  const queryClient = useQueryClient();

  return <TData, TKey extends QueryKey>(
    options: UseSuspenseQueryOptions<TData, Error, TData, TKey>,
  ) => {
    void queryClient
      .query({
        queryKey: options.queryKey,
        queryFn: options.queryFn,
        retry: false,
      })
      .catch(noop);
  };
};
