'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';

export function EvaluatorSearch() {
  const [params, setParams] = useEvaluatorListParams();
  const [value, setValue] = useState(params.search);

  return (
    <form
      role="search"
      className="flex items-center"
      onSubmit={(event) => {
        event.preventDefault();
        void setParams({ search: value.trim(), page: null });
      }}
    >
      <Input
        type="search"
        value={value}
        placeholder="Search scenarios..."
        aria-label="Search scenarios"
        className="h-7 w-44 rounded-r-none text-xs md:text-xs"
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        type="submit"
        size="icon-sm"
        aria-label="Search"
        className="rounded-l-none"
      >
        <SearchIcon />
      </Button>
    </form>
  );
}
