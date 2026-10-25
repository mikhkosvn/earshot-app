'use client';

import { SearchInput } from '@/components/common/search-input/search-input';

import { ALERT_SEARCH_PARAM } from '../../_constants/alerts-params';
import { AlertScopeSelect } from './alert-scope-select';
import { AlertTypeFilterSelect } from './alert-type-filter-select';

export function AlertFilterRow() {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
      <SearchInput
        placeholder="Search metrics..."
        paramKey={ALERT_SEARCH_PARAM}
        className="min-w-48 flex-1 md:w-auto"
      />
      <AlertScopeSelect />
      <AlertTypeFilterSelect />
    </div>
  );
}
