'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ALL_QUICK_RANGES } from '@/lib/time-range/constants';

import type { TimeRange } from './time-range';

type QuickRangeListProps = TimeRange & {
  onApply: (range: TimeRange) => void;
};

export function QuickRangeList({ from, to, onApply }: QuickRangeListProps) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const ranges = ALL_QUICK_RANGES.filter((range) =>
    range.label.toLowerCase().includes(needle),
  );

  return (
    <div className="flex w-1/2 flex-col">
      <div className="flex items-center gap-2 border-b p-2">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          placeholder="Search quick ranges"
          aria-label="Search quick ranges"
          className="h-7 border-none bg-transparent px-0 text-xs shadow-none focus-visible:ring-0 md:text-xs dark:bg-transparent"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="flex max-h-80 flex-col overflow-y-auto py-1">
        {ranges.map((range) => (
          <Button
            key={range.label}
            type="button"
            variant="ghost"
            size="sm"
            data-current={range.from === from && range.to === to}
            className="justify-start rounded-none border-l-2 border-transparent text-xs font-normal data-[current=true]:border-foreground data-[current=true]:bg-muted"
            onClick={() => onApply({ from: range.from, to: range.to })}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
