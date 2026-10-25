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

export type DashboardItem = {
  id: number;
  name: string;
  source: DashboardSource;
  includeInDailyReport: boolean;
  widgetCount: number;
};

export type WidgetItem = {
  id: number;
  sortPosition: number;
  config: PlotConfig;
};

export type DashboardDetail = DashboardItem & {
  filters: DashboardFilterState;
  widgets: WidgetItem[];
};

export type PlotMetricOption = {
  id: number;
  name: string;
  evalType: MetricEvalType;
  functionName: string | null;
};

export type StatCell = {
  label: string;
  value: string;
  unit: string | null;
  change: number | null;
};

export type BucketRow = {
  key: string;
  label: string;
  sampleCount: number;
  values: Record<string, number | null>;
};

export type PlotSeries = {
  key: string;
  label: string;
};

export type PlotPoint = {
  id: number;
  timestamp: string;
  label: string;
  value: number;
};

export type PlotSlice = {
  label: string;
  value: number;
  percentage: number;
};

type PlotDataBase = {
  displayName: string;
  aggregationLabel: string | null;
  percent: boolean;
};

export type StatPlotData = PlotDataBase & {
  kind: typeof PlotDataKind.stat;
  cells: StatCell[];
};

export type BucketPlotData = PlotDataBase & {
  kind: typeof PlotDataKind.buckets;
  series: PlotSeries[];
  rows: BucketRow[];
};

export type PointPlotData = PlotDataBase & {
  kind: typeof PlotDataKind.points;
  points: PlotPoint[];
};

export type SlicePlotData = PlotDataBase & {
  kind: typeof PlotDataKind.slices;
  slices: PlotSlice[];
  total: number;
};

export type PlotData =
  StatPlotData | BucketPlotData | PointPlotData | SlicePlotData;
