import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type MutationCache,
  type QueryCache,
} from '@tanstack/react-query';

interface MakeQueryClientArgs {
  mutationCache?: MutationCache;
  queryCache?: QueryCache;
  queryRetry?: number;
}

export const makeQueryClient = ({
  mutationCache,
  queryCache,
  queryRetry,
}: MakeQueryClientArgs = {}) =>
  new QueryClient({
    mutationCache,
    queryCache,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: queryRetry,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => false,
      },
    },
  });
