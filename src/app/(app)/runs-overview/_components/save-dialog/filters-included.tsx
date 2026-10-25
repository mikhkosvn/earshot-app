'use client';

import { useFilterOptionsQuery } from '../../_hooks/use-filter-options-query';
import { useOverviewFilters } from '../../_hooks/use-overview-filters';
import { filterSummaryLines } from '../../_utils/filter-summary';
import { FilterSummary } from './filter-summary';

export function FiltersIncluded() {
  const filters = useOverviewFilters();
  const { data: options } = useFilterOptionsQuery();
  const lines = filterSummaryLines(filters, options);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium">Filters included</p>
      <div className="rounded-lg border bg-muted/40 px-3 py-2 text-sm">
        <FilterSummary lines={lines} />
      </div>
    </div>
  );
}
