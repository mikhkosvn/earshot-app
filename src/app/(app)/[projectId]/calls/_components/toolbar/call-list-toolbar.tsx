import { Suspense } from 'react';

import { AddCallButton } from '../add-call/add-call-button';
import { CallFiltersButton } from '../filters/call-filters-button';
import { ExportCallsButton } from '../export/export-calls-button';
import { CallSearchForm } from './call-search-form';
import { CallTimeRange } from './call-time-range';
import { SelectViewMenu } from './select-view-menu';

export function CallListToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <Suspense fallback={null}>
          <SelectViewMenu />
        </Suspense>
        <CallSearchForm />
      </div>
      <div className="flex items-center gap-1.5">
        <AddCallButton />
        <CallFiltersButton />
        <ExportCallsButton />
        <CallTimeRange />
      </div>
    </div>
  );
}
