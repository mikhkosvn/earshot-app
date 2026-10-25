'use client';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useSearchParam } from './use-search-param';

const DEFAULT_PARAM_KEY = 'search';

type SearchInputProps = {
  placeholder: string;
  paramKey?: string;
  className?: string;
};

export function SearchInput({
  placeholder,
  paramKey = DEFAULT_PARAM_KEY,
  className,
}: SearchInputProps) {
  const { search, setSearch } = useSearchParam(paramKey);

  return (
    <div className={cn('relative w-full md:w-64', className)}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-7 bg-background pl-7 text-xs md:text-xs"
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
