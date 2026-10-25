'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAgentSearchParam } from '../../_hooks/agent-list/use-agent-search-param';

export function AgentSearchForm() {
  const { search, setSearch } = useAgentSearchParam();
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
        placeholder="Search agents..."
        aria-label="Search agents..."
        className="h-7 w-44 bg-background text-xs md:text-xs"
        onChange={(event) => setDraft(event.target.value)}
      />
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  );
}
