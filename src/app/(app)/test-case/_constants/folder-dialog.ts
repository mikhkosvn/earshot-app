export const FolderDialog = {
  subfolder: 'subfolder',
  rename: 'rename',
  delete: 'delete',
} as const;

export type FolderDialog = (typeof FolderDialog)[keyof typeof FolderDialog];
