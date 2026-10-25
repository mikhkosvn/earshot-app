'use client';

import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useOverviewFilters } from '../../_hooks/use-overview-filters';
import { activeFilterCount } from '../../_utils/overview-filters-param';
import { FilterCountBadge } from './filter-count-badge';
import { OverviewFiltersDialog } from './overview-filters-dialog';

export function FiltersButton() {
  const [open, setOpen] = useState(false);
  const filters = useOverviewFilters();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <FilterIcon />
        Filters
        <FilterCountBadge count={activeFilterCount(filters)} />
      </Button>
      <OverviewFiltersDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
