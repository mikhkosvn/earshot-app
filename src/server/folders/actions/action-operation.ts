export const FoldersActionOperation = {
  listFolders: 'folders.list_folders',
  createFolder: 'folders.create_folder',
  renameFolder: 'folders.rename_folder',
  deleteFolder: 'folders.delete_folder',
  duplicateFolder: 'folders.duplicate_folder',
} as const;

export type FoldersActionOperation =
  (typeof FoldersActionOperation)[keyof typeof FoldersActionOperation];
