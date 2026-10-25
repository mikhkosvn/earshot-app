import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { PROJECT_TRANSACTION_TIMEOUT_MS } from '@/server/projects/constants/project-transaction';
import { createProjectSchema } from '@/server/projects/schemas';
import { createProjectRecord } from '@/server/projects/utils/create-project-record';
import { setCurrentProjectCookie } from '@/server/projects/utils/current-project-cookie';

export const createProject = withValidation(
  createProjectSchema,
  async ({ organizationId, name }) => {
    const { user } = await requireUser();
    await prisma.organization.findUniqueOrThrow({
      where: { id: organizationId, members: { some: { userId: user.id } } },
      select: { id: true },
    });

    const project = await prisma.$transaction(
      (tx) => createProjectRecord(tx, { organizationId, name }),
      { timeout: PROJECT_TRANSACTION_TIMEOUT_MS },
    );
    addEventFields({
      project: { id: project.id },
      organization: { id: organizationId },
    });
    await setCurrentProjectCookie(project.id);
    return project;
  },
);
