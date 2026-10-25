'use client';

import { FiltersButton } from '../../filters-dialog/filters-button';
import { MetricVisibilityButton } from '../../metric-visibility/metric-visibility-button';
import { SaveDashboardButton } from '../../save-dialog/save-dashboard-button';
import { ChartTypeToggle } from './chart-type-toggle';
import { OverviewTimeRange } from './overview-time-range';
import { PeriodSelect } from './period-select';
import { SelectConfigurationMenu } from './select-configuration-menu';
import { TryDashboardsButton } from './try-dashboards-button';

export function OverviewToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-sm font-semibold">Runs overview</h1>
        <SelectConfigurationMenu />
        <TryDashboardsButton />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <MetricVisibilityButton />
        <ChartTypeToggle />
        <PeriodSelect />
        <OverviewTimeRange />
        <FiltersButton />
        <SaveDashboardButton />
      </div>
    </div>
  );
}
