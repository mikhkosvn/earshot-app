'use client';

import { ResultFiltersPopover } from '../../../../_components/filters/result-filters-popover';
import { RUN_PAGE_PARAM } from '../../../../_constants/result-params';
import { AddRunsToLabButton } from './add-runs-to-lab-button';
import { DeleteRunsButton } from './delete-runs-button';
import { ReevaluateRunsButton } from './reevaluate-runs-button';
import { RunSelectedButton } from './run-selected-button';

type RunsCardToolbarProps = {
  selectedIds: number[];
  onCleared: () => void;
};

export function RunsCardToolbar({
  selectedIds,
  onCleared,
}: RunsCardToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ResultFiltersPopover pageParamKey={RUN_PAGE_PARAM} />
      <ReevaluateRunsButton selectedIds={selectedIds} />
      <AddRunsToLabButton selectedIds={selectedIds} />
      <RunSelectedButton selectedIds={selectedIds} />
      <DeleteRunsButton selectedIds={selectedIds} onDeleted={onCleared} />
    </div>
  );
}
