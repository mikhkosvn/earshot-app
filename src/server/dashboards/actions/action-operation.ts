export const DashboardsActionOperation = {
  listDashboards: 'dashboards.list_dashboards',
  getFirstDashboardId: 'dashboards.get_first_dashboard_id',
  getDashboard: 'dashboards.get_dashboard',
  getPlotData: 'dashboards.get_plot_data',
  listPlotMetrics: 'dashboards.list_plot_metrics',
  createDashboard: 'dashboards.create_dashboard',
  renameDashboard: 'dashboards.rename_dashboard',
  duplicateDashboard: 'dashboards.duplicate_dashboard',
  deleteDashboard: 'dashboards.delete_dashboard',
  setDashboardDailyReport: 'dashboards.set_dashboard_daily_report',
  saveDashboardChanges: 'dashboards.save_dashboard_changes',
} as const;

export type DashboardsActionOperation =
  (typeof DashboardsActionOperation)[keyof typeof DashboardsActionOperation];
