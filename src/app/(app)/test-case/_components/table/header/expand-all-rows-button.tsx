'use client';

import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { EvaluatorTableInstance } from '../../../_constants/evaluator-table/evaluator-table-features';
import { useAreAllEvaluatorRowsExpanded } from '../../../_hooks/table/use-are-all-evaluator-rows-expanded';
import { ExpandAllIcon } from './expand-all-icon';

interface ExpandAllRowsButtonProps {
  table: EvaluatorTableInstance;
}

export function ExpandAllRowsButton({ table }: ExpandAllRowsButtonProps) {
  const allExpanded = useAreAllEvaluatorRowsExpanded(table);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="Expand or collapse all rows"
      onClick={() => table.toggleAllRowsExpanded(!allExpanded)}
    >
      <ExpandAllIcon
        isExpanded={allExpanded}
        expandIcon={<ChevronsUpDownIcon />}
        collapseIcon={<ChevronsDownUpIcon />}
      />
    </Button>
  );
}
