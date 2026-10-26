'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createDashboard } from '@/server/dashboards/manage/create-dashboard';
import { deleteDashboard } from '@/server/dashboards/manage/delete-dashboard';
import { duplicateDashboard } from '@/server/dashboards/manage/duplicate-dashboard';
import { getDashboard } from '@/server/dashboards/manage/get-dashboard';
import { getFirstDashboardId } from '@/server/dashboards/manage/get-first-dashboard-id';
import { listDashboards } from '@/server/dashboards/manage/list-dashboards';
import { renameDashboard } from '@/server/dashboards/manage/rename-dashboard';
import { saveDashboardChanges } from '@/server/dashboards/manage/save-dashboard-changes';
import { setDashboardDailyReport } from '@/server/dashboards/manage/set-dashboard-daily-report';
import { getPlotData } from '@/server/dashboards/plots/get-plot-data';
import { listPlotMetrics } from '@/server/dashboards/plots/list-plot-metrics';
import type {
  CreateDashboardInput,
  DashboardDetail,
  DashboardIdInput,
  DashboardItem,
  GetPlotDataInput,
  PlotData,
  PlotMetricOption,
  ProjectIdInput,
  ProjectSourceInput,
  RenameDashboardInput,
  SaveDashboardChangesInput,
  SetDashboardDailyReportInput,
} from '@/server/dashboards/types';
import { DashboardsActionOperation } from '@/server/dashboards/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listDashboardsAction(
  args: ProjectSourceInput,
): Promise<DashboardItem[]> {
  return withActionEvent(DashboardsActionOperation.listDashboards, () =>
    listDashboards(args),
  );
}

export async function getFirstDashboardIdAction(
  args: ProjectSourceInput,
): Promise<number> {
  return withActionEvent(DashboardsActionOperation.getFirstDashboardId, () =>
    getFirstDashboardId(args),
  );
}

export async function getDashboardAction(
  args: DashboardIdInput,
): Promise<DashboardDetail> {
  return withActionEvent(DashboardsActionOperation.getDashboard, () =>
    getDashboard(args),
  );
}

export async function getPlotDataAction(
  args: GetPlotDataInput,
): Promise<PlotData> {
  return withActionEvent(DashboardsActionOperation.getPlotData, () =>
    getPlotData(args),
  );
}

export async function listPlotMetricsAction(
  args: ProjectIdInput,
): Promise<PlotMetricOption[]> {
  return withActionEvent(DashboardsActionOperation.listPlotMetrics, () =>
    listPlotMetrics(args),
  );
}

export async function createDashboardAction(
  args: CreateDashboardInput,
): Promise<ActionResult<DashboardItem>> {
  return withActionEvent(DashboardsActionOperation.createDashboard, () =>
    runAction(() => createDashboard(args)),
  );
}

export async function renameDashboardAction(
  args: RenameDashboardInput,
): Promise<ActionResult<DashboardItem>> {
  return withActionEvent(DashboardsActionOperation.renameDashboard, () =>
    runAction(() => renameDashboard(args)),
  );
}

export async function duplicateDashboardAction(
  args: DashboardIdInput,
): Promise<ActionResult<DashboardItem>> {
  return withActionEvent(DashboardsActionOperation.duplicateDashboard, () =>
    runAction(() => duplicateDashboard(args)),
  );
}

export async function deleteDashboardAction(
  args: DashboardIdInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(DashboardsActionOperation.deleteDashboard, () =>
    runAction(() => deleteDashboard(args)),
  );
}

export async function setDashboardDailyReportAction(
  args: SetDashboardDailyReportInput,
): Promise<ActionResult<DashboardItem>> {
  return withActionEvent(
    DashboardsActionOperation.setDashboardDailyReport,
    () => runAction(() => setDashboardDailyReport(args)),
  );
}

export async function saveDashboardChangesAction(
  args: SaveDashboardChangesInput,
): Promise<ActionResult<DashboardDetail>> {
  return withActionEvent(DashboardsActionOperation.saveDashboardChanges, () =>
    runAction(() => saveDashboardChanges(args)),
  );
}
