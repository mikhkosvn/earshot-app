import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { ProjectOption } from '@/server/evaluators/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listProjectOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<ProjectOption[]> => {
    const { project } = await requireProjectAccess(projectId);
    const projects = await prisma.project.findMany({
      where: { organizationId: project.organization.id },
      select: { id: true, name: true },
      orderBy: { name: Prisma.SortOrder.asc },
    });
    addEventFields({
      project: { id: projectId },
      organization: { id: project.organization.id },
      projects: { count: projects.length },
    });
    return projects;
  },
);
