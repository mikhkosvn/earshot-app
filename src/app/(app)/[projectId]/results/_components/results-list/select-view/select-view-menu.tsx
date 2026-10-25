'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { SelectViewLabel } from './select-view-label';
import { SelectViewMenuBody } from './select-view-menu-body';

export function SelectViewMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label="Select view"
            className="w-45 justify-between text-xs font-normal"
          />
        }
      >
        <SelectViewLabel />
        <ChevronDownIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-50">
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-16 w-full" />}>
            <SelectViewMenuBody />
          </Suspense>
        </QueryErrorBoundary>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
