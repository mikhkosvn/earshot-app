import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';

import { ResultFiltersPopover } from '../../filters/result-filters-popover';
import { SelectViewMenu } from '../select-view/select-view-menu';
import { ResultsViewToggle } from './results-view-toggle';

export function RunsToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <SelectViewMenu />
      <ResultsViewToggle />
      <ResultFiltersPopover pageParamKey={DEFAULT_PAGE_PARAM_KEY} />
    </div>
  );
}
