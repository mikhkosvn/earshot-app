'use client';

import type { MetricSelection } from '../metrics-view';
import { SelectViewMenu } from '../select-view/select-view-menu';
import { AssignAgentsButton } from './assign-agents-button';
import { BulkDeleteButton } from './bulk-delete-button';
import { CreateMetricLink } from './create-metric-link';
import { GenerateMetricsButton } from './generate-metrics-button';
import { PredefinedMetricsButton } from './predefined-metrics-button';
import { ToggleSettingsButton } from './toggle-settings-button';

export function MetricsToolbar({
  selectedIds,
  onSelectedIdsChange,
}: MetricSelection) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex h-7 items-center gap-1 rounded-lg border bg-background pl-2.5 text-xs">
        <span className="pr-1 whitespace-nowrap">
          {selectedIds.length} selected
        </span>
        <BulkDeleteButton
          selectedIds={selectedIds}
          onSelectedIdsChange={onSelectedIdsChange}
        />
      </div>
      <SelectViewMenu />
      <GenerateMetricsButton />
      <CreateMetricLink />
      <PredefinedMetricsButton />
      <AssignAgentsButton selectedIds={selectedIds} />
      <ToggleSettingsButton selectedIds={selectedIds} />
    </div>
  );
}
