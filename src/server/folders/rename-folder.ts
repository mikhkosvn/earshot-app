import 'server-only';

import { FolderSystemRole } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { renameFolderSchema } from '@/server/folders/schemas';
import {
  assertFolderPathFree,
  findFolderOrThrow,
} from '@/server/folders/utils/find-folder';
import {
  descendantPathPrefix,
  joinFolderPath,
  parentFolderPath,
} from '@/server/folders/utils/folder-path';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const renameFolder = withValidation(
  renameFolderSchema,
  async ({ projectId, path, name }) => {
    await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const folder = await findFolderOrThrow(tx, projectId, path);
      if (folder.systemRole === FolderSystemRole.regression_suite) {
        throw new ActionError('The Regression Suite folder cannot be renamed.');
      }
      const nextPath = joinFolderPath(parentFolderPath(path), name);
      if (nextPath === path) return { id: folder.id, path };
      await assertFolderPathFree(tx, projectId, nextPath);
      const descendants = await tx.folder.findMany({
        where: { projectId, path: { startsWith: descendantPathPrefix(path) } },
        select: { id: true, path: true },
      });
      await tx.folder.update({
        where: { id: folder.id },
        data: { path: nextPath },
      });
      addEventFields({
        folder: { id: folder.id, descendant_count: descendants.length },
      });
      for (const descendant of descendants) {
        await tx.folder.update({
          where: { id: descendant.id },
          data: { path: nextPath + descendant.path.slice(path.length) },
        });
      }
      return { id: folder.id, path: nextPath };
    });
  },
);
