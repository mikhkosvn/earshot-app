import type { z } from 'zod';

import type { FolderSystemRole } from '@/generated/prisma/enums';
import type {
  createFolderSchema,
  folderNameFormSchema,
  folderTargetSchema,
  listFoldersSchema,
  renameFolderSchema,
} from '@/server/folders/schemas';

export type ListFoldersInput = z.infer<typeof listFoldersSchema>;
export type CreateFolderInput = z.input<typeof createFolderSchema>;
export type RenameFolderInput = z.input<typeof renameFolderSchema>;
export type FolderTargetInput = z.input<typeof folderTargetSchema>;
export type FolderNameFormValues = z.input<typeof folderNameFormSchema>;

export interface FolderView {
  id: number;
  name: string;
  path: string;
  depth: number;
  systemRole: FolderSystemRole | null;
  isRegressionSuite: boolean;
  isDeletable: boolean;
  isRenamable: boolean;
  evaluatorCount: number;
  createdAt: Date;
}
