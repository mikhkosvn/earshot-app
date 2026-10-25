import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listFoldersSchema } from '@/server/folders/schemas';
import { toFolderTree } from '@/server/folders/utils/folder-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listFolders = withValidation(
  listFoldersSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.folder.findMany({
      where: { projectId },
      select: {
        id: true,
        path: true,
        systemRole: true,
        createdAt: true,
        _count: { select: { evaluators: true } },
      },
    });
    return toFolderTree(rows);
  },
);
