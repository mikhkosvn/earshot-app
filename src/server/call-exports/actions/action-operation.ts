export const CallExportsActionOperation = {
  exportCallLogs: 'call_exports.export_call_logs',
} as const;

export type CallExportsActionOperation =
  (typeof CallExportsActionOperation)[keyof typeof CallExportsActionOperation];
