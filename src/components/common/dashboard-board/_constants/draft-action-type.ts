export const DraftActionType = {
  add: 'add',
  update: 'update',
  duplicate: 'duplicate',
  remove: 'remove',
  move: 'move',
  setFilters: 'set_filters',
  reset: 'reset',
} as const;

export type DraftActionType =
  (typeof DraftActionType)[keyof typeof DraftActionType];

export const PlotDialogMode = {
  closed: 'closed',
  create: 'create',
  edit: 'edit',
} as const;

export type PlotDialogMode =
  (typeof PlotDialogMode)[keyof typeof PlotDialogMode];
