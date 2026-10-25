'use client';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { usePersonalityFilters } from '../../../_hooks/list/use-personality-filters';

export function PersonalitySearchField() {
  const [{ search }, setFilters] = usePersonalityFilters();

  return (
    <div className="relative w-48">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        placeholder="Search"
        aria-label="Search"
        className="h-7 bg-background pl-7 text-xs md:text-xs"
        onChange={(event) => setFilters({ search: event.target.value })}
      />
    </div>
  );
}
