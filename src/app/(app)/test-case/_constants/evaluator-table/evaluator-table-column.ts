export const EvaluatorTableColumn = {
  expand: 'expand',
  actions: 'actions',
} as const;

export type EvaluatorTableColumn =
  (typeof EvaluatorTableColumn)[keyof typeof EvaluatorTableColumn];
