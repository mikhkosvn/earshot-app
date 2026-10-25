'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryDevtools() {
  if (process.env.NEXT_PUBLIC_QUERY_DEVTOOLS !== 'true') return null;

  return <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />;
}
