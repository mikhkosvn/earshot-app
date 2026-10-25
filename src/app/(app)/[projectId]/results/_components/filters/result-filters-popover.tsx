'use client';

import { ListFilterIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

import { useActiveResultFilterCount } from '../../_hooks/filters/use-active-result-filter-count';
import { ResultFiltersPanel } from './result-filters-panel';

type ResultFiltersPopoverProps = {
  pageParamKey: string;
};

const countText = (count: number) => {
  if (count === 0) return '';
  return ` (${count})`;
};

export function ResultFiltersPopover({
  pageParamKey,
}: ResultFiltersPopoverProps) {
  const [open, setOpen] = useState(false);
  const count = useActiveResultFilterCount();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="text-xs" />}
      >
        <ListFilterIcon />
        Filters{countText(count)}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(32rem,calc(100vw-2rem))] gap-0 p-0"
      >
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <ResultFiltersPanel
              pageParamKey={pageParamKey}
              onClose={() => setOpen(false)}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PopoverContent>
    </Popover>
  );
}
