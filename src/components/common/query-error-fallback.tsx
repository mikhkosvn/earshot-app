'use client';

import { RotateCwIcon } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

export function QueryErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2 p-3 text-xs text-muted-foreground"
    >
      <p>The data did not load.</p>
      <Button variant="outline" size="xs" onClick={resetErrorBoundary}>
        <RotateCwIcon />
        Try again
      </Button>
    </div>
  );
}
