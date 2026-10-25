'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { toggledIds } from '../../../_utils/runs/run-selection';
import type { RunSelection } from '../runs-table';

interface RunSelectCheckboxProps {
  runId: number;
  selection?: RunSelection;
}

export function RunSelectCheckbox({
  runId,
  selection,
}: RunSelectCheckboxProps) {
  if (!selection) return null;

  const { selectedIds, onSelectedIdsChange } = selection;

  return (
    <span onClick={(event) => event.stopPropagation()}>
      <Checkbox
        aria-label={`Select run ${runId}`}
        checked={selectedIds.includes(runId)}
        onCheckedChange={(checked) =>
          onSelectedIdsChange(toggledIds(selectedIds, runId, checked))
        }
      />
    </span>
  );
}
