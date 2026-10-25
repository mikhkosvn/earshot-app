import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { deleteProjectFiles } from '@/server/files/delete-project-files';
import { projectIdSchema } from '@/server/projects/schemas';
import type { DeleteProjectResult } from '@/server/projects/types';
import { setCurrentProjectCookie } from '@/server/projects/utils/current-project-cookie';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const deleteProject = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<DeleteProjectResult> => {
    const { project } = await requireProjectAccess(projectId);

    const nextProject = await prisma.project.findFirst({
      where: { organizationId: project.organizationId, id: { not: projectId } },
      orderBy: { id: 'asc' },
      select: { id: true },
    });
    if (!nextProject) {
      throw new ActionError(
        'The last remaining project in an organization cannot be deleted.',
      );
    }

    addEventFields({ next_project: { id: nextProject.id } });
    await prisma.project.delete({ where: { id: projectId } });
    await deleteProjectFiles(projectId);
    await setCurrentProjectCookie(nextProject.id);
    return { nextProjectId: nextProject.id };
  },
);
