'use client';

import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { FailureTrendSeries } from '@/server/insights/types';

import { TREND_COLORS, TREND_CHART_HEIGHT } from '../../_constants/trend-chart';
import { FailureTrendEmpty } from './failure-trend-empty';

const LABEL_FORMAT = 'MMM d, HH:mm';

interface FailureTrendChartProps {
  series: FailureTrendSeries;
}

export function FailureTrendChart({ series }: FailureTrendChartProps) {
  const config: ChartConfig = Object.fromEntries(
    series.categories.map((category, index) => [
      category.key,
      {
        label: category.name,
        color: TREND_COLORS[index % TREND_COLORS.length],
      },
    ]),
  );
  const rows = series.points.map((point) => ({
    ...point.counts,
    label: format(point.bucketStart, LABEL_FORMAT),
  }));

  return (
    <div className="flex flex-col gap-2 rounded-md border p-3">
      <p className="text-xs font-medium">{series.metricName}</p>
      <FailureTrendEmpty count={series.categories.length} />
      <ChartContainer
        config={config}
        className="aspect-auto w-full"
        style={{ height: TREND_CHART_HEIGHT }}
      >
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -16 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            minTickGap={24}
            fontSize={10}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            fontSize={10}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {series.categories.map((category) => (
            <Bar
              key={category.key}
              dataKey={category.key}
              stackId="failures"
              fill={`var(--color-${category.key})`}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
