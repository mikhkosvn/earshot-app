export const EvaluatorTextKind = {
  instructions: 'instructions',
  expectedOutcome: 'expectedOutcome',
} as const;

export type EvaluatorTextKind =
  (typeof EvaluatorTextKind)[keyof typeof EvaluatorTextKind];

export const EvaluatorTextKindLabel: Record<EvaluatorTextKind, string> = {
  [EvaluatorTextKind.instructions]: 'Instructions',
  [EvaluatorTextKind.expectedOutcome]: 'Expected Outcome',
};
