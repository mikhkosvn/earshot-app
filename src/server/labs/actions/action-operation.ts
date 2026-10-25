export const LabsActionOperation = {
  listLabMetrics: 'labs.list_lab_metrics',
  getLab: 'labs.get_lab',
  updateLabExpected: 'labs.update_lab_expected',
  updateLabFeedback: 'labs.update_lab_feedback',
  deleteLabTestSets: 'labs.delete_lab_test_sets',
  startLabRun: 'labs.start_lab_run',
} as const;

export type LabsActionOperation =
  (typeof LabsActionOperation)[keyof typeof LabsActionOperation];
