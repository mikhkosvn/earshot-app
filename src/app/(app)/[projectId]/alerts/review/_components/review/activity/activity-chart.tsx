'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import {
  ACTIVITY_CHART_HEIGHT,
  EMPTY_CHART_MAX,
} from '../../../_constants/alert-chart';
import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { useAlertWindow } from '../../../_hooks/params/use-alert-window';
import { activityRows, seriesColor } from '../../../_utils/activity-rows';

export function ActivityChart() {
  const { data: review } = useAlertReviewQuery();
  const { hours } = useAlertWindow();
  const rows = activityRows(review.timeline, hours);
  const config: ChartConfig = Object.fromEntries(
    review.series.map((series, index) => [
      series.key,
      { label: series.label, color: seriesColor(series.key, index) },
    ]),
  );
  const top = Math.max(EMPTY_CHART_MAX, ...rows.map((row) => row.total));

  return (
    <ChartContainer
      config={config}
      className="aspect-auto w-full"
      style={{ height: ACTIVITY_CHART_HEIGHT }}
    >
      <BarChart data={rows} margin={{ top: 8, right: 8, left: -16 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          minTickGap={24}
          fontSize={11}
        />
        <YAxis
          dataKey="total"
          allowDecimals={false}
          domain={[0, top]}
          tickLine={false}
          axisLine={false}
          fontSize={11}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {review.series.map((series) => (
          <Bar
            key={series.key}
            dataKey={series.key}
            stackId="fires"
            fill={`var(--color-${series.key})`}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
