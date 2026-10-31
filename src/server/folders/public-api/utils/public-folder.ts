import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { FolderSystemRole } from '@/generated/prisma/enums';
import { folderName } from '@/server/folders/utils/folder-path';

export const publicFolderSelect = {
  id: true,
  path: true,
  systemRole: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FolderSelect;

export type PublicFolderRow = Prisma.FolderGetPayload<{
  select: typeof publicFolderSelect;
}>;

export const toPublicFolder = (row: PublicFolderRow) => ({
  name: folderName(row.path),
  path: row.path,
  is_infrastructure_suite: false,
  is_deletable: row.systemRole === null,
  is_renamable: row.systemRole !== FolderSystemRole.regression_suite,
  is_regression_suite: row.systemRole === FolderSystemRole.regression_suite,
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});
