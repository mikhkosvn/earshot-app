export const CallLogsActionOperation = {
  listCallLogs: 'call_logs.list_call_logs',
  hasCallLogs: 'call_logs.has_call_logs',
  getCallLog: 'call_logs.get_call_log',
  listCallMetricColumns: 'call_logs.list_call_metric_columns',
  uploadCallLogs: 'call_logs.upload_call_logs',
  updateCallReview: 'call_logs.update_call_review',
  updateCallFeedback: 'call_logs.update_call_feedback',
  recomputeCallMetrics: 'call_logs.recompute_call_metrics',
  createEvaluatorsFromCalls: 'call_logs.create_evaluators_from_calls',
} as const;

export type CallLogsActionOperation =
  (typeof CallLogsActionOperation)[keyof typeof CallLogsActionOperation];
