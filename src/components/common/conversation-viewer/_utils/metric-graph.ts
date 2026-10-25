import type { ConversationMetricItem } from '@/server/conversations/types';

import { FALLBACK_LINE_COLOR, PERCENTILE_COLORS } from '../_constants/chart';

export interface GraphPoint {
  time: number;
  value: number;
}

export interface GraphLine {
  key: string;
  label: string;
  value: number;
  color: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const recordOf = (value: unknown) => {
  if (!isRecord(value)) return null;
  return value;
};

export const findMetricByFunction = (
  metrics: readonly ConversationMetricItem[],
  functionName: string,
) => metrics.find((metric) => metric.functionName === functionName) ?? null;

export const graphPoints = (
  metric: ConversationMetricItem | null,
  field: string,
): GraphPoint[] => {
  const graph = metric?.extra?.graph_data;
  if (!Array.isArray(graph)) return [];
  return graph.flatMap((item) => {
    const point = recordOf(item);
    const time = point?.start_time;
    const value = point?.[field];
    if (typeof time !== 'number' || typeof value !== 'number') return [];
    return [{ time, value }];
  });
};

export const percentileLines = (
  metric: ConversationMetricItem | null,
  unit: string,
): GraphLine[] => {
  const percentiles = recordOf(metric?.extra?.percentiles);
  if (!percentiles) return [];
  return Object.entries(percentiles).flatMap(([key, value]) => {
    if (typeof value !== 'number') return [];
    return [
      {
        key,
        label: `${key.toUpperCase()} (${value}${unit})`,
        value,
        color: PERCENTILE_COLORS[key] ?? FALLBACK_LINE_COLOR,
      },
    ];
  });
};

export const averageOf = (points: readonly GraphPoint[]) => {
  if (points.length === 0) return null;
  const sum = points.reduce((total, point) => total + point.value, 0);
  return Math.round((sum / points.length) * 10) / 10;
};
