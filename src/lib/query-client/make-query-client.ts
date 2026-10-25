import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type MutationCache,
} from '@tanstack/react-query';

interface MakeQueryClientArgs {
  mutationCache?: MutationCache;
  queryRetry?: number;
}

export const makeQueryClient = ({
  mutationCache,
  queryRetry,
}: MakeQueryClientArgs = {}) =>
  new QueryClient({
    mutationCache,
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
