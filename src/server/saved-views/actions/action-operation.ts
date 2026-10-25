export const SavedViewsActionOperation = {
  listSavedViews: 'saved_views.list_saved_views',
  createSavedView: 'saved_views.create_saved_view',
} as const;

export type SavedViewsActionOperation =
  (typeof SavedViewsActionOperation)[keyof typeof SavedViewsActionOperation];
