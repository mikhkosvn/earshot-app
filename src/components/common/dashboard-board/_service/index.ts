import { queryOptions } from '@tanstack/react-query';

import type { DashboardSource } from '@/generated/prisma/enums';
import { deferAction } from '@/lib/query-client/defer-action';
import { listAgentOptionsAction } from '@/server/agents/actions';
import {
  getDashboardAction,
  getPlotDataAction,
  listDashboardsAction,
  listPlotMetricsAction,
} from '@/server/dashboards/actions';
import type {
  DashboardFilterState,
  PlotConfig,
} from '@/server/dashboards/types';

export const DashboardKey = {
  list: 'dashboard-list',
  detail: 'dashboard-detail',
  plotData: 'dashboard-plot-data',
  metrics: 'dashboard-plot-metrics',
  agents: 'dashboard-agent-options',
  create: 'dashboard-create',
  rename: 'dashboard-rename',
  duplicate: 'dashboard-duplicate',
  remove: 'dashboard-delete',
  dailyReport: 'dashboard-daily-report',
  save: 'dashboard-save',
} as const;

export type DashboardKey = (typeof DashboardKey)[keyof typeof DashboardKey];

export class DashboardService {
  static readonly listKey = [DashboardKey.list];
  static readonly plotDataKey = [DashboardKey.plotData];
  static readonly createMutationKey = [DashboardKey.create];
  static readonly renameMutationKey = [DashboardKey.rename];
  static readonly duplicateMutationKey = [DashboardKey.duplicate];
  static readonly deleteMutationKey = [DashboardKey.remove];
  static readonly dailyReportMutationKey = [DashboardKey.dailyReport];
  static readonly saveMutationKey = [DashboardKey.save];

  static getListQuery(args: { projectId: number; source: DashboardSource }) {
    return queryOptions({
      queryKey: [DashboardKey.list, args],
      queryFn: () => deferAction(() => listDashboardsAction(args)),
    });
  }

  static getDetailQuery({ dashboardId }: { dashboardId: number }) {
    return queryOptions({
      queryKey: [DashboardKey.detail, dashboardId],
      queryFn: () => deferAction(() => getDashboardAction({ dashboardId })),
    });
  }

  static plotDataPrefix(dashboardId: number) {
    return [DashboardKey.plotData, dashboardId];
  }

  static getPlotDataQuery(args: {
    dashboardId: number;
    plot: PlotConfig;
    filters: DashboardFilterState;
  }) {
    return queryOptions({
      queryKey: [DashboardKey.plotData, args.dashboardId, args],
      queryFn: () => deferAction(() => getPlotDataAction(args)),
    });
  }

  static getMetricsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [DashboardKey.metrics, projectId],
      queryFn: () => deferAction(() => listPlotMetricsAction({ projectId })),
    });
  }

  static getAgentsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [DashboardKey.agents, projectId],
      queryFn: () => deferAction(() => listAgentOptionsAction({ projectId })),
    });
  }
}
