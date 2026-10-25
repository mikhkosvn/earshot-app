'use client';

import { Cell, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { PlotConfig, SlicePlotData } from '@/server/dashboards/types';

import { sliceColor } from '../../_utils/chart-format';
import { SliceLegend } from './slice-legend';

type SlicePieChartProps = {
  data: SlicePlotData;
  config: PlotConfig;
};

export function SlicePieChart({ data, config }: SlicePieChartProps) {
  const chartConfig = Object.fromEntries(
    data.slices.map((slice, index) => [
      slice.label,
      { label: slice.label, color: sliceColor(index, config.color) },
    ]),
  );

  return (
    <div className="flex size-full flex-col items-center gap-2">
      <div className="relative min-h-0 w-full flex-1">
        <ChartContainer config={chartConfig} className="aspect-auto size-full">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="label" />}
            />
            <Pie
              data={data.slices}
              dataKey="value"
              nameKey="label"
              innerRadius="58%"
              outerRadius="85%"
              strokeWidth={2}
            >
              {data.slices.map((slice, index) => (
                <Cell
                  key={slice.label}
                  fill={sliceColor(index, config.color)}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">
            {data.total}
          </span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>
      <SliceLegend data={data} config={config} />
    </div>
  );
}
