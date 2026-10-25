'use client';

import { Button } from '@/components/ui/button';
import {
  type EvaluatorSortField,
  SortDirection,
  SortDirectionLabel,
} from '@/server/evaluators/constants/evaluator-list';

import { useEvaluatorListParams } from '../../../_hooks/use-evaluator-list-params';
import { SortIcon } from './sort-icon';

interface SortableHeadProps {
  field: EvaluatorSortField;
  label: string;
}

const nextDirection = (isActive: boolean, current: SortDirection) => {
  if (isActive && current === SortDirection.desc) return SortDirection.asc;
  return SortDirection.desc;
};

export function SortableHead({ field, label }: SortableHeadProps) {
  const [{ sortBy, sortDir }, setParams] = useEvaluatorListParams();
  const isActive = sortBy === field;
  const direction = nextDirection(isActive, sortDir);

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={`Sort by ${label}, ${SortDirectionLabel[direction]}`}
      className="gap-1 text-xs font-medium"
      onClick={() =>
        setParams({ sortBy: field, sortDir: direction, page: null })
      }
    >
      {label}
      <SortIcon isActive={isActive} direction={sortDir} />
    </Button>
  );
}
