'use client';

import { GitCompareArrowsIcon, LayoutGridIcon } from 'lucide-react';

import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';
import { Button } from '@/components/ui/button';

import { ResultFiltersPopover } from '../../filters/result-filters-popover';
import { SelectViewMenu } from '../select-view/select-view-menu';
import { DeleteResultsButton } from './delete-results-button';
import { ExportAllButton } from './export-all-button';
import { ReevaluateResultsButton } from './reevaluate-results-button';
import { ResultsViewToggle } from './results-view-toggle';

type ResultsToolbarProps = {
  selectedIds: number[];
  onDeleted: () => void;
};

export function ResultsToolbar({ selectedIds, onDeleted }: ResultsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <SelectViewMenu />
      <ResultsViewToggle />
      <ResultFiltersPopover pageParamKey={DEFAULT_PAGE_PARAM_KEY} />
      <ExportAllButton />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        disabled
      >
        <LayoutGridIcon />
        Reports
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        disabled
      >
        <GitCompareArrowsIcon />
        Compare Results
      </Button>
      <ReevaluateResultsButton selectedIds={selectedIds} />
      <DeleteResultsButton selectedIds={selectedIds} onDeleted={onDeleted} />
    </div>
  );
}
