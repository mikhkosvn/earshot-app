'use client';

import { Button } from '@/components/ui/button';
import type { RunSortField } from '@/server/results/constants/result-list';

import { useRunSort } from '../../../_hooks/runs/use-run-sort';
import { RunSortIcon } from './run-sort-icon';

type SortableRunHeadProps = {
  field: RunSortField;
  label: string;
  pageParamKey: string;
};

export function SortableRunHead({
  field,
  label,
  pageParamKey,
}: SortableRunHeadProps) {
  const { isActive, currentDirection, applySort } = useRunSort(
    field,
    pageParamKey,
  );

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={`Sort by ${label}`}
      className="gap-1 text-xs font-medium"
      onClick={applySort}
    >
      {label}
      <RunSortIcon isActive={isActive} direction={currentDirection} />
    </Button>
  );
}
