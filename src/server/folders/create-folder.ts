import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { createFolderSchema } from '@/server/folders/schemas';
import {
  assertFolderPathFree,
  findFolderOrThrow,
} from '@/server/folders/utils/find-folder';
import { joinFolderPath } from '@/server/folders/utils/folder-path';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createFolder = withValidation(
  createFolderSchema,
  async ({ projectId, name, parentPath }) => {
    await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      if (parentPath) await findFolderOrThrow(tx, projectId, parentPath);
      const path = joinFolderPath(parentPath, name);
      await assertFolderPathFree(tx, projectId, path);
      return tx.folder.create({
        data: { projectId, path },
        select: { id: true, path: true },
      });
    });
  },
);
