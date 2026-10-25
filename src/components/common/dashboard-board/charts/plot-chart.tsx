'use client';

import { PlotDataKind } from '@/server/dashboards/constants/plot/plot-data-kind';
import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';
import type { PlotConfig, PlotData } from '@/server/dashboards/types';

import { BucketPlot } from './kinds/bucket-plot';
import { PointChart } from './kinds/point-chart';
import { SliceList } from './kinds/slice-list';
import { SlicePieChart } from './kinds/slice-pie-chart';
import { StatCells } from './kinds/stat-cells';
import { PlotEmpty } from './plot-empty';

type PlotChartProps = {
  data: PlotData;
  config: PlotConfig;
};

export function PlotChart({ data, config }: PlotChartProps) {
  switch (data.kind) {
    case PlotDataKind.stat:
      return <StatCells data={data} />;
    case PlotDataKind.buckets:
      if (data.rows.length === 0) return <PlotEmpty />;
      return <BucketPlot data={data} config={config} />;
    case PlotDataKind.points:
      if (data.points.length === 0) return <PlotEmpty />;
      return <PointChart data={data} config={config} />;
    default:
      if (data.slices.length === 0) return <PlotEmpty />;
      if (config.displayType === PlotDisplayType.list) {
        return <SliceList data={data} config={config} />;
      }
      return <SlicePieChart data={data} config={config} />;
  }
}
