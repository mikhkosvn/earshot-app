import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectKnowledgeIdSchema } from '@/server/project-knowledge/schemas';
import type { ProjectKnowledgeVersionRow } from '@/server/project-knowledge/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listProjectKnowledgeVersions = withValidation(
  projectKnowledgeIdSchema,
  async ({ projectId }): Promise<ProjectKnowledgeVersionRow[]> => {
    await requireProjectAccess(projectId);
    const versions = await prisma.projectKnowledgeVersion.findMany({
      where: { projectId },
      orderBy: { version: 'desc' },
      select: {
        id: true,
        version: true,
        content: true,
        createdAt: true,
        createdBy: { select: { name: true } },
      },
    });
    return versions.map(({ createdBy, ...version }) => ({
      ...version,
      createdByName: createdBy?.name ?? null,
    }));
  },
);
