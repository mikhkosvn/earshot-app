'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useCallSearchParam } from '../../_hooks/call-params/use-call-search-param';

export function CallSearchForm() {
  const { search, setSearch } = useCallSearchParam();
  const [draft, setDraft] = useState(search);

  return (
    <form
      className="flex items-center gap-1.5"
      onSubmit={(event) => {
        event.preventDefault();
        void setSearch(draft);
      }}
    >
      <Input
        type="search"
        value={draft}
        placeholder="Search from any column"
        aria-label="Search from any column"
        className="h-7 w-48 bg-background text-xs md:text-xs"
        onChange={(event) => setDraft(event.target.value)}
      />
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  );
}
