export const MonitorsActionOperation = {
  listMonitors: 'monitors.list_monitors',
  getMonitor: 'monitors.get_monitor',
  listMonitorRuns: 'monitors.list_monitor_runs',
  listMonitorAgentOptions: 'monitors.list_monitor_agent_options',
  listMonitorScenarios: 'monitors.list_monitor_scenarios',
  createMonitor: 'monitors.create_monitor',
  updateMonitor: 'monitors.update_monitor',
  setMonitorActive: 'monitors.set_monitor_active',
  deleteMonitor: 'monitors.delete_monitor',
} as const;

export type MonitorsActionOperation =
  (typeof MonitorsActionOperation)[keyof typeof MonitorsActionOperation];
