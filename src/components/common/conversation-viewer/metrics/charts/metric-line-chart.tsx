'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CHART_LINE_COLOR } from '../../_constants/chart';
import { formatAxisTime } from '../../_utils/format-time';
import type { GraphLine, GraphPoint } from '../../_utils/metric-graph';
import { timeTicks } from '../../_utils/time-ticks';
import { ChartEmpty } from './chart-empty';
import { ChartLegend } from './chart-legend';

const CHART_HEIGHT = 260;
const AXIS_FONT_SIZE = 11;

interface MetricLineChartProps {
  points: GraphPoint[];
  lines: readonly GraphLine[];
  duration: number;
  valueLabel: string;
}

export function MetricLineChart({
  points,
  lines,
  duration,
  valueLabel,
}: MetricLineChartProps) {
  if (points.length === 0) return <ChartEmpty />;
  const end = Math.max(duration, ...points.map((point) => point.time), 1);

  return (
    <div className="flex flex-col gap-2">
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={points} margin={{ top: 8, right: 16, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="time"
            domain={[0, end]}
            ticks={timeTicks(end)}
            tickFormatter={formatAxisTime}
            fontSize={AXIS_FONT_SIZE}
          />
          <YAxis fontSize={AXIS_FONT_SIZE} width={48} />
          <Tooltip
            labelFormatter={(label) => formatAxisTime(Number(label))}
            formatter={(value) => [value, valueLabel]}
          />
          {lines.map((line) => (
            <ReferenceLine
              key={line.key}
              y={line.value}
              stroke={line.color}
              strokeDasharray="4 4"
            />
          ))}
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_LINE_COLOR}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART_LINE_COLOR }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <ChartLegend lines={lines} />
    </div>
  );
}
