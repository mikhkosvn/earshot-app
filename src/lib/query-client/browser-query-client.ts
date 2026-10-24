import type { QueryClient } from '@tanstack/react-query';

import { makeQueryClient } from './make-query-client';

let browserQueryClient: QueryClient | undefined;

export const getBrowserQueryClient = () => {
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
