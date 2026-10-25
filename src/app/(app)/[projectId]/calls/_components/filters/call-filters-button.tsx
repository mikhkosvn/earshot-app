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

import { useCallFiltersParam } from '../../_hooks/call-params/use-call-filters-param';
import { CallFiltersPanel } from './call-filters-panel';

const countText = (count: number) => {
  if (count === 0) return '';
  return ` (${count})`;
};

export function CallFiltersButton() {
  const [open, setOpen] = useState(false);
  const { conditions } = useCallFiltersParam();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="text-xs" />}
      >
        <ListFilterIcon />
        Filters{countText(conditions.length)}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(44rem,calc(100vw-2rem))] gap-0 p-0"
      >
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <CallFiltersPanel onClose={() => setOpen(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </PopoverContent>
    </Popover>
  );
}
