import { MutationCache, type QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { isActionResult } from '@/lib/action-result';

import { makeQueryClient } from './make-query-client';

export const makeBrowserMutationCache = () =>
  new MutationCache({
    onSuccess: (data) => {
      if (!isActionResult(data) || data.ok) return;
      toast.error(data.error);
    },
    onError: () => {
      toast.error('Something went wrong. Try again.');
    },
  });

const BROWSER_QUERY_RETRY = 1;

let browserQueryClient: QueryClient | undefined;

export const getBrowserQueryClient = () => {
  browserQueryClient ??= makeQueryClient({
    mutationCache: makeBrowserMutationCache(),
    queryRetry: BROWSER_QUERY_RETRY,
  });
  return browserQueryClient;
};
