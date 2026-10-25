'use client';

import type { DashboardBoardState } from '../_utils/board-types';
import type { PlotConfig } from '@/server/dashboards/types';
import { usePlotDataQuery } from '../_hooks/queries/use-plot-data-query';
import { PlotChart } from './plot-chart';
import { PlotFooter } from './plot-footer';

interface PlotBodyContentProps {
  board: DashboardBoardState;
  config: PlotConfig;
}

export function PlotBodyContent({ board, config }: PlotBodyContentProps) {
  const { data } = usePlotDataQuery(board, config);

  return (
    <div className="flex size-full flex-col">
      <div className="min-h-0 flex-1 p-3">
        <PlotChart data={data} config={config} />
      </div>
      <PlotFooter data={data} />
    </div>
  );
}
