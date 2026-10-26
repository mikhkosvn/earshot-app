export const AlertsActionOperation = {
  getAlertReview: 'alerts.get_alert_review',
  getAlertFireCounts: 'alerts.get_alert_fire_counts',
  listAlerts: 'alerts.list_alerts',
  listAlertMetricOptions: 'alerts.list_alert_metric_options',
  createAlert: 'alerts.create_alert',
  updateAlert: 'alerts.update_alert',
  deleteAlert: 'alerts.delete_alert',
} as const;

export type AlertsActionOperation =
  (typeof AlertsActionOperation)[keyof typeof AlertsActionOperation];
