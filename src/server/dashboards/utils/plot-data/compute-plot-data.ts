import 'server-only';

import { DashboardSource, WidgetTimePeriod } from '@/generated/prisma/enums';
import { parseTimeExpression } from '@/lib/time-range/parse-time-expression';
import { PlotAggregationShortLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import { FieldValueKind } from '@/server/dashboards/constants/plot/field-value-kind';
import { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';
import { PlotDataKind } from '@/server/dashboards/constants/plot/plot-data-kind';
import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';
import { PlotOutcome } from '@/server/dashboards/constants/plot/plot-outcome';
import { WidgetGroupBy } from '@/server/dashboards/constants/plot/widget-group-by';
import type {
  DashboardFilterState,
  PlotConfig,
  PlotData,
} from '@/server/dashboards/types';
import {
  loadPlotRecords,
  type PlotRecord,
  type RecordScope,
} from '@/server/dashboards/utils/records/load-plot-records';
import { pointLabel } from '@/server/dashboards/utils/time/time-labels';

import { roundValue } from './aggregate';
import { bucketPlot } from './bucket-plot';
import { type FieldContext, loadFieldContext } from './field-context';
import {
  categoryLabelOf,
  groupKeyOf,
  numericValueOf,
  rawValueOf,
} from './record-value';
import { slicePlot } from './slice-plot';
import { statCells, statFactsOf } from './stat-plot';

const MAX_POINTS = 1000;

const DEFAULT_RANGE_MS = 7 * 24 * 3_600_000;

export type PlotComputeInput = {
  projectId: number;
  source: DashboardSource;
  timeZone: string;
  config: PlotConfig;
  filters: DashboardFilterState;
  now?: Date;
};

export const rangeOf = (filters: DashboardFilterState, now: Date) => {
  const to = parseTimeExpression(filters.to, now) ?? now;
  const from =
    parseTimeExpression(filters.from, now) ??
    new Date(to.getTime() - DEFAULT_RANGE_MS);
  return { from, to };
};

const outcomeMatches = (record: PlotRecord, outcome: PlotOutcome) => {
  if (outcome === PlotOutcome.success) return record.success === true;
  if (outcome === PlotOutcome.failure) return record.success === false;
  return true;
};

const aggregationLabelOf = (
  aggregation: PlotAggregation,
  kind: FieldValueKind,
) => {
  if (
    kind === FieldValueKind.boolean &&
    aggregation === PlotAggregation.count
  ) {
    return 'Count';
  }
  return PlotAggregationShortLabel[aggregation];
};

const isPercent = (aggregation: PlotAggregation, context: FieldContext) =>
  aggregation === PlotAggregation.percentage &&
  (context.kind === FieldValueKind.boolean || context.isRating);

const statPlot = async (
  input: PlotComputeInput,
  scope: RecordScope,
  records: PlotRecord[],
): Promise<PlotData> => {
  const length = scope.to.getTime() - scope.from.getTime();
  const previousRecords = await loadPlotRecords({
    ...scope,
    from: new Date(scope.from.getTime() - length),
    to: new Date(scope.from.getTime() - 1),
  });
  const [current, previous] = await Promise.all([
    statFactsOf(input.projectId, records),
    statFactsOf(input.projectId, previousRecords),
  ]);
  return {
    kind: PlotDataKind.stat,
    displayName: input.config.name,
    aggregationLabel: null,
    percent: false,
    cells: statCells(input.source, current, previous),
  };
};

const slicesPlot = (
  records: PlotRecord[],
  config: PlotConfig,
  context: FieldContext,
): PlotData => {
  const labels = records.flatMap((record) => {
    const label = categoryLabelOf(rawValueOf(record, config, context));
    if (label === null) return [];
    return [label];
  });
  return {
    kind: PlotDataKind.slices,
    displayName: context.displayName,
    aggregationLabel: null,
    percent: false,
    ...slicePlot(labels),
  };
};

const pointsPlot = (
  records: PlotRecord[],
  config: PlotConfig,
  context: FieldContext,
  timeZone: string,
): PlotData => {
  const points = records.flatMap((record) => {
    const value = numericValueOf(
      rawValueOf(record, config, context),
      config,
      context,
    );
    if (value === null) return [];
    return [
      {
        id: record.id,
        timestamp: record.createdAt.toISOString(),
        label: pointLabel(record.createdAt, timeZone),
        value: roundValue(value),
      },
    ];
  });
  return {
    kind: PlotDataKind.points,
    displayName: context.displayName,
    aggregationLabel: null,
    percent: false,
    points: points.slice(-MAX_POINTS),
  };
};

const groupOf = (
  record: PlotRecord,
  config: PlotConfig,
  context: FieldContext,
) => {
  if (config.groupBy === WidgetGroupBy.none) return null;
  return groupKeyOf(record, config, context);
};

const bucketsPlot = (
  records: PlotRecord[],
  config: PlotConfig,
  context: FieldContext,
  timeZone: string,
): PlotData => {
  const aggregation = config.aggregation ?? PlotAggregation.avg;
  const samples = records.flatMap((record) => {
    const value = numericValueOf(
      rawValueOf(record, config, context),
      config,
      context,
    );
    if (value === null) return [];
    return [
      {
        date: record.createdAt,
        value,
        group: groupOf(record, config, context),
      },
    ];
  });
  return {
    kind: PlotDataKind.buckets,
    displayName: context.displayName,
    aggregationLabel: aggregationLabelOf(aggregation, context.kind),
    percent: isPercent(aggregation, context),
    ...bucketPlot({
      samples,
      period: config.timePeriod ?? WidgetTimePeriod.day,
      timeZone,
      aggregation,
      kind: context.kind,
      displayName: context.displayName,
    }),
  };
};

export const computePlotData = async (
  input: PlotComputeInput,
): Promise<PlotData> => {
  const { from, to } = rangeOf(input.filters, input.now ?? new Date());
  const scope: RecordScope = {
    projectId: input.projectId,
    source: input.source,
    from,
    to,
    agentId: input.filters.agentId,
    metadata: input.filters.metadata,
  };
  const allRecords = await loadPlotRecords(scope);
  const { config } = input;
  if (config.displayType === PlotDisplayType.stat) {
    return statPlot(input, scope, allRecords);
  }
  const records = allRecords.filter((record) =>
    outcomeMatches(record, config.outcome),
  );
  const context = await loadFieldContext(input.projectId, config, records);
  if (
    config.displayType === PlotDisplayType.pie ||
    config.displayType === PlotDisplayType.list
  ) {
    return slicesPlot(records, config, context);
  }
  if (config.displayType === PlotDisplayType.scatter) {
    return pointsPlot(records, config, context, input.timeZone);
  }
  return bucketsPlot(records, config, context, input.timeZone);
};
