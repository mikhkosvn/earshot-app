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
import { formatAxisValue } from '@/components/common/dashboard-board/_utils/chart-format';
import {
  PLOT_COLOR_VALUE,
  PlotColor,
} from '@/server/dashboards/constants/plot/plot-color';
import { OverviewChartType } from '@/server/runs-overview/constants';
import type { OverviewPoint } from '@/server/runs-overview/types';

import { OverviewChartEmpty } from './overview-chart-empty';

type OverviewChartProps = {
  points: OverviewPoint[];
  chartType: OverviewChartType;
  percent: boolean;
  name: string;
};

const VALUE_KEY = 'value';

export function OverviewChart({
  points,
  chartType,
  percent,
  name,
}: OverviewChartProps) {
  if (points.length === 0) return <OverviewChartEmpty />;

  const config = {
    [VALUE_KEY]: { label: name, color: PLOT_COLOR_VALUE[PlotColor.blue] },
  };
  const yAxis = (
    <YAxis
      width={48}
      tickLine={false}
      axisLine={false}
      tickFormatter={(value: number) => formatAxisValue(value, percent)}
    />
  );

  if (chartType === OverviewChartType.line) {
    return (
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <LineChart data={points} margin={{ left: 0, right: 12, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          {yAxis}
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey={VALUE_KEY}
            type="monotone"
            stroke={`var(--color-${VALUE_KEY})`}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <BarChart data={points} margin={{ left: 0, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        {yAxis}
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey={VALUE_KEY}
          fill={`var(--color-${VALUE_KEY})`}
          maxBarSize={56}
        />
      </BarChart>
    </ChartContainer>
  );
}
