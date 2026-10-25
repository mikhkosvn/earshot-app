'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import getQueryClient from '@/lib/query-client/get-query-client';

import { QueryDevtools } from './query-devtools';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="bottom-right" richColors closeButton />
        <QueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
