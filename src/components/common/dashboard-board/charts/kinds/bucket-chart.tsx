'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';
import type { BucketPlotData, PlotConfig } from '@/server/dashboards/types';

import { formatAxisValue, seriesChartConfig } from '../../_utils/chart-format';

type BucketChartProps = {
  data: BucketPlotData;
  config: PlotConfig;
};

const STACK_ID = 'plot';

export function BucketChart({ data, config }: BucketChartProps) {
  const chartConfig = seriesChartConfig(data.series, config.color);
  const rows = data.rows.map((row) => ({ label: row.label, ...row.values }));
  const axis = (
    <YAxis
      width={48}
      tickLine={false}
      axisLine={false}
      tickFormatter={(value: number) => formatAxisValue(value, data.percent)}
    />
  );

  if (config.displayType === PlotDisplayType.line) {
    return (
      <ChartContainer config={chartConfig} className="aspect-auto size-full">
        <LineChart data={rows} margin={{ left: 0, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          {axis}
          <ChartTooltip content={<ChartTooltipContent />} />
          {data.series.map((series) => (
            <Line
              key={series.key}
              dataKey={series.key}
              type="monotone"
              stroke={`var(--color-${series.key})`}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-auto size-full">
      <BarChart data={rows} margin={{ left: 0, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        {axis}
        <ChartTooltip content={<ChartTooltipContent />} />
        {data.series.map((series) => (
          <Bar
            key={series.key}
            dataKey={series.key}
            stackId={STACK_ID}
            fill={`var(--color-${series.key})`}
            maxBarSize={56}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
