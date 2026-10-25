export const RunsActionOperation = {
  getRunDefaults: 'runs.get_run_defaults',
  getRunAgentConfiguration: 'runs.get_run_agent_configuration',
  getRunBatchStatus: 'runs.get_run_batch_status',
  startRun: 'runs.start_run',
  checkTestSuite: 'runs.check_test_suite',
  runTestSuite: 'runs.run_test_suite',
  cancelResult: 'runs.cancel_result',
  reevaluateResult: 'runs.reevaluate_result',
  reevaluateConversations: 'runs.reevaluate_conversations',
} as const;

export type RunsActionOperation =
  (typeof RunsActionOperation)[keyof typeof RunsActionOperation];
