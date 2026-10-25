export const EvaluatorActionDialog = {
  addTags: 'addTags',
  modify: 'modify',
  duplicate: 'duplicate',
  move: 'move',
} as const;

export type EvaluatorActionDialog =
  (typeof EvaluatorActionDialog)[keyof typeof EvaluatorActionDialog];
