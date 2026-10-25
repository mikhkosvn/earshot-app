'use client';

import { FilterIcon } from 'lucide-react';

import { IMPROVE_SCOPE_OPTIONS } from '@/server/evaluators/constants/evaluator-list';

import { OptionSelect } from '../fields/option-select';

const SCOPE_ITEMS = IMPROVE_SCOPE_OPTIONS.map((size) => ({
  value: size,
  label: String(size),
}));

interface ImproveScopeRowProps {
  scope: number;
  onScopeChange: (scope: number) => void;
}

export function ImproveScopeRow({
  scope,
  onScopeChange,
}: ImproveScopeRowProps) {
  return (
    <div className="flex items-center gap-2 border-b px-3 py-2 text-xs">
      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        <FilterIcon className="size-3" />
        Filtered
      </span>
      <span className="text-muted-foreground">Evaluators in scope</span>
      <OptionSelect
        items={SCOPE_ITEMS}
        value={scope}
        onValueChange={(next) => {
          if (next === null) return;
          onScopeChange(next);
        }}
        placeholder="50"
        className="h-7 w-20"
      />
    </div>
  );
}
