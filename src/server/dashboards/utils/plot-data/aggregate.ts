import 'server-only';

import { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';
import { FieldValueKind } from '@/server/dashboards/constants/plot/field-value-kind';

export const percentile = (values: number[], fraction: number) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const weight = position - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);

const average = (values: number[]) => sum(values) / values.length;

const PERCENTILES: Partial<Record<PlotAggregation, number>> = {
  [PlotAggregation.p50]: 0.5,
  [PlotAggregation.p95]: 0.95,
  [PlotAggregation.p99]: 0.99,
};

const aggregateBoolean = (values: number[], aggregation: PlotAggregation) => {
  if (aggregation === PlotAggregation.count) return sum(values);
  return average(values) * 100;
};

const aggregateNumber = (values: number[], aggregation: PlotAggregation) => {
  if (aggregation === PlotAggregation.count) return values.length;
  if (aggregation === PlotAggregation.sum) return sum(values);
  if (aggregation === PlotAggregation.min) return Math.min(...values);
  if (aggregation === PlotAggregation.max) return Math.max(...values);
  const fraction = PERCENTILES[aggregation];
  if (fraction !== undefined) return percentile(values, fraction);
  return average(values);
};

const aggregateByKind = (
  values: number[],
  aggregation: PlotAggregation,
  kind: FieldValueKind,
) => {
  if (kind === FieldValueKind.boolean) {
    return aggregateBoolean(values, aggregation);
  }
  return aggregateNumber(values, aggregation);
};

export const roundValue = (value: number) => Math.round(value * 100) / 100;

export const aggregateValues = (
  values: number[],
  aggregation: PlotAggregation,
  kind: FieldValueKind,
) => {
  if (values.length === 0) return null;
  const result = aggregateByKind(values, aggregation, kind);
  if (result === null) return null;
  return roundValue(result);
};

export const median = (values: number[]) => percentile(values, 0.5);
