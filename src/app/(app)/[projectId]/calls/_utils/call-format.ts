import { format } from 'date-fns';

import { MetricEvalType } from '@/generated/prisma/enums';
import type {
  CallMetricCell,
  CallMetricColumn,
} from '@/server/call-logs/types';

const START_FORMAT = "MMM d, yyyy 'at' hh:mm a";

const PERCENT_SCALE = 100;

const pad = (value: number) => String(value).padStart(2, '0');

export const callStartedText = (date: Date) => format(date, START_FORMAT);

export const callDurationText = (seconds: number | null) => {
  if (seconds === null) return '00:00m';
  const whole = Math.round(seconds);
  return `${pad(Math.floor(whole / 60))}:${pad(whole % 60)}m`;
};

const numberText = (value: number) => value.toFixed(2);

const percentilesText = (cell: CallMetricCell) => {
  const parts = [cell.firstTurn, cell.p50, cell.p99].filter(
    (part): part is number => part !== null,
  );
  if (parts.length === 0) return null;
  return parts.map(numberText).join(' ');
};

export const metricCellText = (
  cell: CallMetricCell,
  column: CallMetricColumn,
) => {
  const { value } = cell;
  if (value === null || typeof value === 'boolean') return '';
  if (typeof value === 'string') return value.toUpperCase();
  const percentiles = percentilesText(cell);
  if (percentiles) return percentiles;
  if (
    column.evalType === MetricEvalType.continuous_qualitative &&
    cell.normalizedScore !== null
  ) {
    return `${Math.round(cell.normalizedScore * PERCENT_SCALE)}%`;
  }
  return numberText(value);
};
