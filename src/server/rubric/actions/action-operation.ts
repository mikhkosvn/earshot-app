export const RubricActionOperation = {
  getRubric: 'rubric.get_rubric',
  saveRubric: 'rubric.save_rubric',
} as const;

export type RubricActionOperation =
  (typeof RubricActionOperation)[keyof typeof RubricActionOperation];
