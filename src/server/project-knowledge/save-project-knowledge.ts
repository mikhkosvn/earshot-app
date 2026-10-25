import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { saveProjectKnowledgeSchema } from '@/server/project-knowledge/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const saveProjectKnowledge = withValidation(
  saveProjectKnowledgeSchema,
  async ({ projectId, content }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const latest = await tx.projectKnowledgeVersion.aggregate({
        where: { projectId },
        _max: { version: true },
      });
      return tx.projectKnowledgeVersion.create({
        data: {
          projectId,
          content,
          version: (latest._max.version ?? 0) + 1,
          createdById: user.id,
        },
        select: { id: true, version: true },
      });
    });
  },
);
