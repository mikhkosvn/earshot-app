import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { projectSummarySelect } from '@/server/projects/constants/project-select';
import { listProjectsSchema } from '@/server/projects/schemas';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const listProjects = withValidation(
  listProjectsSchema,
  async ({ organizationId }) => {
    const { user } = await requireUser();
    return prisma.project.findMany({
      where: { organizationId, ...projectAccessWhere(user.id) },
      orderBy: { id: 'asc' },
      select: projectSummarySelect,
    });
  },
);
