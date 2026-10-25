import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { DashboardSource, WidgetTimePeriod } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { TIME_SERIES_DISPLAY_TYPES } from '@/server/dashboards/constants/plot/plot-display-type';
import type {
  DashboardFilterState,
  PlotConfig,
} from '@/server/dashboards/types';
import { fromStoredFilters } from '@/server/dashboards/utils/dashboard-filters';
import { computePlotData } from '@/server/dashboards/utils/plot-data/compute-plot-data';
import { statFactsOf } from '@/server/dashboards/utils/plot-data/stat-plot';
import { loadPlotRecords } from '@/server/dashboards/utils/records/load-plot-records';
import {
  toPlotConfig,
  widgetSelect,
} from '@/server/dashboards/utils/widget-row';
import type { DailyReport, ReportDashboard } from '@/server/daily-report/types';

import { summarizePlot } from './summarize-plot';

type ReportWindow = {
  projectId: number;
  projectName: string;
  reportDate: string;
  timeZone: string;
  windowStart: Date;
  windowEnd: Date;
};

const windowFilters = (
  window: ReportWindow,
  saved: DashboardFilterState,
): DashboardFilterState => ({
  ...saved,
  from: window.windowStart.toISOString(),
  to: window.windowEnd.toISOString(),
});

const reportConfig = (config: PlotConfig): PlotConfig => {
  if (!TIME_SERIES_DISPLAY_TYPES.includes(config.displayType)) return config;
  return { ...config, timePeriod: WidgetTimePeriod.day };
};

const totalsOf = async (window: ReportWindow, source: DashboardSource) => {
  const records = await loadPlotRecords({
    projectId: window.projectId,
    source,
    from: window.windowStart,
    to: window.windowEnd,
    agentId: null,
    metadata: [],
  });
  return statFactsOf(window.projectId, records);
};

const reportDashboards = async (
  window: ReportWindow,
): Promise<ReportDashboard[]> => {
  const dashboards = await prisma.dashboard.findMany({
    where: { projectId: window.projectId, includeInDailyReport: true },
    orderBy: [
      { createdAt: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: {
      id: true,
      name: true,
      source: true,
      filters: true,
      widgets: {
        orderBy: { sortPosition: Prisma.SortOrder.asc },
        select: widgetSelect,
      },
    },
  });
  const result: ReportDashboard[] = [];
  for (const dashboard of dashboards) {
    const filters = windowFilters(window, fromStoredFilters(dashboard.filters));
    const plots = [];
    for (const widget of dashboard.widgets) {
      const config = toPlotConfig(widget);
      const data = await computePlotData({
        projectId: window.projectId,
        source: dashboard.source,
        timeZone: window.timeZone,
        config: reportConfig(config),
        filters,
        now: window.windowEnd,
      });
      plots.push({ name: config.name, summary: summarizePlot(data) });
    }
    result.push({ id: dashboard.id, name: dashboard.name, plots });
  }
  return result;
};

export const buildDailyReport = async (
  window: ReportWindow,
): Promise<DailyReport> => {
  const [calls, runs, dashboards] = await Promise.all([
    totalsOf(window, DashboardSource.call_logs),
    totalsOf(window, DashboardSource.runs),
    reportDashboards(window),
  ]);
  return { ...window, calls, runs, dashboards, aiSummary: null };
};
