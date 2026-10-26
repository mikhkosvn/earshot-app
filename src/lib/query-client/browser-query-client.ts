import {
  MutationCache,
  QueryCache,
  type QueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { isActionResult } from '@/lib/action-result';
import { recordMutationEvent } from '@/lib/logging/browser/record-mutation-event';
import { recordQueryFailureEvent } from '@/lib/logging/browser/record-query-failure-event';

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
    onSettled: (data, error, _variables, _onMutateResult, mutation) => {
      recordMutationEvent(data, error, mutation);
    },
  });

export const makeBrowserQueryCache = () =>
  new QueryCache({
    onError: recordQueryFailureEvent,
  });

const BROWSER_QUERY_RETRY = 1;

let browserQueryClient: QueryClient | undefined;

export const getBrowserQueryClient = () => {
  browserQueryClient ??= makeQueryClient({
    mutationCache: makeBrowserMutationCache(),
    queryCache: makeBrowserQueryCache(),
    queryRetry: BROWSER_QUERY_RETRY,
  });
  return browserQueryClient;
};
