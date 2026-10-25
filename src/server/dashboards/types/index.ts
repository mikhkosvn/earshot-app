import type { z } from 'zod';

import type { DashboardSource, MetricEvalType } from '@/generated/prisma/enums';

import type { PlotDataKind } from '../constants/plot/plot-data-kind';
import type {
  createDashboardSchema,
  dashboardFilterStateSchema,
  dashboardIdSchema,
  getPlotDataSchema,
  metadataConditionSchema,
  plotConfigSchema,
  projectIdSchema,
  projectSourceSchema,
  renameDashboardSchema,
  saveDashboardChangesSchema,
  setDashboardDailyReportSchema,
} from '../schemas';

export type MetadataCondition = z.output<typeof metadataConditionSchema>;
export type DashboardFilterState = z.output<typeof dashboardFilterStateSchema>;
export type PlotConfig = z.output<typeof plotConfigSchema>;

export type ProjectSourceInput = z.input<typeof projectSourceSchema>;
export type DashboardIdInput = z.input<typeof dashboardIdSchema>;
export type ProjectIdInput = z.input<typeof projectIdSchema>;
export type CreateDashboardInput = z.input<typeof createDashboardSchema>;
export type RenameDashboardInput = z.input<typeof renameDashboardSchema>;
export type SetDashboardDailyReportInput = z.input<
  typeof setDashboardDailyReportSchema
>;
export type SaveDashboardChangesInput = z.input<
  typeof saveDashboardChangesSchema
>;
export type GetPlotDataInput = z.input<typeof getPlotDataSchema>;

export interface DashboardItem {
  id: number;
  name: string;
  source: DashboardSource;
  includeInDailyReport: boolean;
  widgetCount: number;
}

export interface WidgetItem {
  id: number;
  sortPosition: number;
  config: PlotConfig;
}

export interface DashboardDetail extends DashboardItem {
  filters: DashboardFilterState;
  widgets: WidgetItem[];
}

export interface PlotMetricOption {
  id: number;
  name: string;
  evalType: MetricEvalType;
  functionName: string | null;
}

export interface StatCell {
  label: string;
  value: string;
  unit: string | null;
  change: number | null;
}

export interface BucketRow {
  key: string;
  label: string;
  sampleCount: number;
  values: Record<string, number | null>;
}

export interface PlotSeries {
  key: string;
  label: string;
}

export interface PlotPoint {
  id: number;
  timestamp: string;
  label: string;
  value: number;
}

export interface PlotSlice {
  label: string;
  value: number;
  percentage: number;
}

interface PlotDataBase {
  displayName: string;
  aggregationLabel: string | null;
  percent: boolean;
}

export interface StatPlotData extends PlotDataBase {
  kind: typeof PlotDataKind.stat;
  cells: StatCell[];
}

export interface BucketPlotData extends PlotDataBase {
  kind: typeof PlotDataKind.buckets;
  series: PlotSeries[];
  rows: BucketRow[];
}

export interface PointPlotData extends PlotDataBase {
  kind: typeof PlotDataKind.points;
  points: PlotPoint[];
}

export interface SlicePlotData extends PlotDataBase {
  kind: typeof PlotDataKind.slices;
  slices: PlotSlice[];
  total: number;
}

export type PlotData =
  StatPlotData | BucketPlotData | PointPlotData | SlicePlotData;
