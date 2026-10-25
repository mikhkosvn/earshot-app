export const ResultsActionOperation = {
  listResults: 'results.list_results',
  listRuns: 'results.list_runs',
  listResultFilterOptions: 'results.list_result_filter_options',
  getResult: 'results.get_result',
  getResultStatus: 'results.get_result_status',
  getRun: 'results.get_run',
  exportResults: 'results.export_results',
  deleteResults: 'results.delete_results',
  deleteRuns: 'results.delete_runs',
  renameResult: 'results.rename_result',
} as const;

export type ResultsActionOperation =
  (typeof ResultsActionOperation)[keyof typeof ResultsActionOperation];
