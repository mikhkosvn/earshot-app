export const EvaluatorGenerationActionOperation = {
  getGenerationSession: 'evaluator_generation.get_generation_session',
  listGenerationSessions: 'evaluator_generation.list_generation_sessions',
  startEvaluatorAssistant: 'evaluator_generation.start_evaluator_assistant',
  answerEvaluatorAssistant: 'evaluator_generation.answer_evaluator_assistant',
} as const;

export type EvaluatorGenerationActionOperation =
  (typeof EvaluatorGenerationActionOperation)[keyof typeof EvaluatorGenerationActionOperation];
