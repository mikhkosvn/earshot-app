export const EvaluatorsActionOperation = {
  listEvaluators: 'evaluators.list_evaluators',
  getEvaluator: 'evaluators.get_evaluator',
  listEvaluatorVersions: 'evaluators.list_evaluator_versions',
  listAgentOptions: 'evaluators.list_agent_options',
  listPersonalityOptions: 'evaluators.list_personality_options',
  listMetricOptions: 'evaluators.list_metric_options',
  listPhoneNumberOptions: 'evaluators.list_phone_number_options',
  listProjectOptions: 'evaluators.list_project_options',
  getAgentEvaluatorDefaults: 'evaluators.get_agent_evaluator_defaults',
  createEvaluator: 'evaluators.create_evaluator',
  updateEvaluator: 'evaluators.update_evaluator',
  restoreEvaluatorVersion: 'evaluators.restore_evaluator_version',
  deleteEvaluators: 'evaluators.delete_evaluators',
  addEvaluatorTags: 'evaluators.add_evaluator_tags',
  moveEvaluators: 'evaluators.move_evaluators',
  duplicateEvaluators: 'evaluators.duplicate_evaluators',
  modifyEvaluators: 'evaluators.modify_evaluators',
  exportEvaluators: 'evaluators.export_evaluators',
  improveEvaluatorText: 'evaluators.improve_evaluator_text',
  proposeEvaluatorImprovements: 'evaluators.propose_evaluator_improvements',
  applyEvaluatorImprovements: 'evaluators.apply_evaluator_improvements',
  createEvaluatorFromTranscript: 'evaluators.create_evaluator_from_transcript',
} as const;

export type EvaluatorsActionOperation =
  (typeof EvaluatorsActionOperation)[keyof typeof EvaluatorsActionOperation];
