'use client';

import type { BucketPlotData, PlotConfig } from '@/server/dashboards/types';

import { BucketChart } from './bucket-chart';
import { SeriesLegend } from './series-legend';

type BucketPlotProps = {
  data: BucketPlotData;
  config: PlotConfig;
};

export function BucketPlot({ data, config }: BucketPlotProps) {
  return (
    <div className="flex size-full flex-col gap-2">
      <div className="min-h-0 flex-1">
        <BucketChart data={data} config={config} />
      </div>
      <SeriesLegend data={data} config={config} />
    </div>
  );
}
