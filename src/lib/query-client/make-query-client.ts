import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type MutationCache,
} from '@tanstack/react-query';

export const makeQueryClient = (mutationCache?: MutationCache) =>
  new QueryClient({
    mutationCache,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => false,
      },
    },
  });
