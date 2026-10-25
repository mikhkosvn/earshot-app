'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { RunRow } from '@/server/results/types';

import { RunColumn } from '../../../_utils/runs/run-columns';
import type { RunSelection } from '../runs-table';

interface SelectPageRunsCheckboxProps {
  column: RunColumn;
  rows: readonly RunRow[];
  selection?: RunSelection;
}

export function SelectPageRunsCheckbox({
  column,
  rows,
  selection,
}: SelectPageRunsCheckboxProps) {
  if (column !== RunColumn.id || !selection) return null;

  const { selectedIds, onSelectedIdsChange } = selection;
  const pageIds = rows.map((run) => run.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  return (
    <Checkbox
      aria-label="Select all runs on this page"
      checked={allSelected}
      disabled={pageIds.length === 0}
      onCheckedChange={(checked) => {
        if (checked) {
          onSelectedIdsChange([...new Set([...selectedIds, ...pageIds])]);
          return;
        }
        onSelectedIdsChange(selectedIds.filter((id) => !pageIds.includes(id)));
      }}
    />
  );
}
