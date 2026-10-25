'use client';

import type { DashboardBoardState } from '../_utils/board-types';
import { AddPlotButton } from './add-plot-button';
import { AgentFilterSelect } from './agent-filter-select';
import { ClassicViewButton } from './classic-view-button';
import { DailyReportSwitch } from './daily-report-switch';
import { DashboardSelect } from './dashboard-select/dashboard-select';
import { DashboardTimeRange } from './dashboard-time-range';
import { MetadataFilterPopover } from './metadata-filter/metadata-filter-popover';
import { RefreshPlotsButton } from './refresh-plots-button';

type DashboardToolbarProps = {
  board: DashboardBoardState;
};

export function DashboardToolbar({ board }: DashboardToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <DashboardSelect
          dashboardId={board.dashboardId}
          source={board.source}
        />
        <ClassicViewButton source={board.source} />
        <AddPlotButton board={board} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DailyReportSwitch
          dashboardId={board.dashboardId}
          source={board.source}
        />
        <AgentFilterSelect board={board} />
        <MetadataFilterPopover board={board} />
        <DashboardTimeRange board={board} />
        <RefreshPlotsButton dashboardId={board.dashboardId} />
      </div>
    </div>
  );
}
