export const FolderListEntryKind = {
  saved: 'saved',
  pending: 'pending',
} as const;

export type FolderListEntryKind =
  (typeof FolderListEntryKind)[keyof typeof FolderListEntryKind];

export const FOLDER_DEPTH_INDENT_PX = 12;

export const FOLDER_ROW_BASE_PADDING_PX = 8;
