import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { folderTargetSchema } from '@/server/folders/schemas';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import { descendantPathPrefix } from '@/server/folders/utils/folder-path';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const deleteFolder = withValidation(
  folderTargetSchema,
  async ({ projectId, path }) => {
    await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const folder = await findFolderOrThrow(tx, projectId, path);
      if (folder.systemRole) {
        throw new ActionError('This folder cannot be deleted.');
      }
      const { count } = await tx.folder.deleteMany({
        where: {
          projectId,
          OR: [
            { id: folder.id },
            { path: { startsWith: descendantPathPrefix(path) } },
          ],
        },
      });
      return { path, deletedFolderCount: count };
    });
  },
);
