'use client';

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PLOT_COLOR_VALUE } from '@/server/dashboards/constants/plot/plot-color';
import type { PlotConfig, PointPlotData } from '@/server/dashboards/types';

import { formatAxisValue } from '../../_utils/chart-format';

interface PointChartProps {
  data: PointPlotData;
  config: PlotConfig;
}

const VALUE_KEY = 'value';

export function PointChart({ data, config }: PointChartProps) {
  const chartConfig = {
    [VALUE_KEY]: {
      label: data.displayName,
      color: PLOT_COLOR_VALUE[config.color],
    },
  };
  const points = data.points.map((point, index) => ({
    index,
    value: point.value,
    label: point.label,
  }));
  const labelAt = (index: number) => points[index]?.label ?? '';

  return (
    <ChartContainer config={chartConfig} className="aspect-auto size-full">
      <ScatterChart margin={{ left: 0, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="index"
          type="number"
          domain={[-0.5, Math.max(points.length - 0.5, 0.5)]}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          tickFormatter={labelAt}
        />
        <YAxis
          dataKey={VALUE_KEY}
          width={48}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => formatAxisValue(value, false)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              nameKey={VALUE_KEY}
              formatter={(value, _name, item) =>
                `${item.payload.label}: ${String(value)}`
              }
            />
          }
        />
        <Scatter
          data={points}
          dataKey={VALUE_KEY}
          fill={`var(--color-${VALUE_KEY})`}
        />
      </ScatterChart>
    </ChartContainer>
  );
}
