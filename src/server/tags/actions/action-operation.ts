export const TagsActionOperation = {
  listTags: 'tags.list_tags',
} as const;

export type TagsActionOperation =
  (typeof TagsActionOperation)[keyof typeof TagsActionOperation];
