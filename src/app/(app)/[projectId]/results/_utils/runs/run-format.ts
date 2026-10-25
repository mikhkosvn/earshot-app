import { format } from 'date-fns';

import { MetricEvalType } from '@/generated/prisma/enums';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';
import type {
  MetricColumn,
  NamedRef,
  RunMetricCell,
} from '@/server/results/types';

const START_FORMAT = 'MMM d, yyyy, h:mm a';

const DETAIL_START_FORMAT = 'MMM d, yyyy, hh:mm a';

const PERCENT = 100;

const pad = (value: number) => String(value).padStart(2, '0');

export const runStartText = (date: Date) => format(date, START_FORMAT);

export const runDetailStartText = (date: Date) =>
  format(date, DETAIL_START_FORMAT);

export const runDurationText = (seconds: number | null) => {
  if (seconds === null) return '00:00m';
  const whole = Math.round(seconds);
  return `${pad(Math.floor(whole / 60))}:${pad(whole % 60)}m`;
};

export const fixedNumberText = (value: number | null) => {
  if (value === null) return '';
  return value.toFixed(2);
};

export const namedRefText = (ref: { id: number | null; name: string }) => {
  if (ref.id === null) return ref.name;
  return `${ref.name} (${ref.id})`;
};

export const optionalRefText = (ref: NamedRef | null) => {
  if (!ref) return '';
  return namedRefText(ref);
};

export const isLatencyColumn = (column: MetricColumn) =>
  column.functionName === PredefinedFunction.get_latency;

export const metricHeaderText = (column: MetricColumn) => {
  if (isLatencyColumn(column)) return `${column.name} FT P50 P99`;
  return column.name;
};

export const latencyText = (cell: RunMetricCell) =>
  [cell.firstTurn, cell.p50, cell.p99]
    .map((part) => fixedNumberText(part) || '-')
    .join(' ');

export const isPercentColumn = (column: MetricColumn) =>
  column.evalType === MetricEvalType.continuous_qualitative;

export const metricPercent = (value: number) =>
  Math.round(Math.min(1, Math.max(0, value / RATING_SCALE_MAX)) * PERCENT);

export const metricNumberText = (value: number) =>
  String(Math.round(value * PERCENT) / PERCENT);
