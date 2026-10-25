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

let browserQueryClient: QueryClient | undefined;

export const getBrowserQueryClient = () => {
  browserQueryClient ??= makeQueryClient(makeBrowserMutationCache());
  return browserQueryClient;
};
