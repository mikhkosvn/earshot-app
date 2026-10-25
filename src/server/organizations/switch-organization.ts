import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import { organizationIdSchema } from '@/server/organizations/schemas';
import { setCurrentProjectCookie } from '@/server/projects/utils/current-project-cookie';

export const switchOrganization = withValidation(
  organizationIdSchema,
  async ({ organizationId }) => {
    const { user } = await requireUser();
    const organization = await prisma.organization.findUniqueOrThrow({
      where: { id: organizationId, members: { some: { userId: user.id } } },
      select: {
        projects: { orderBy: { id: 'asc' }, take: 1, select: { id: true } },
      },
    });
    const [firstProject] = organization.projects;
    if (!firstProject) {
      throw new ActionError('This organization has no project.');
    }

    await setCurrentProjectCookie(firstProject.id);
    return { projectId: firstProject.id };
  },
);
