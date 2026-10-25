import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

import { readCurrentProjectCookie } from './current-project-cookie';
import { projectAccessWhere } from './project-access-where';

export const resolveCurrentProjectId = async () => {
  const { user } = await requireUser();
  const cookieProjectId = await readCurrentProjectCookie();

  if (cookieProjectId !== null) {
    const project = await prisma.project.findFirst({
      where: { id: cookieProjectId, ...projectAccessWhere(user.id) },
      select: { id: true },
    });
    if (project) return project.id;
  }

  const firstProject = await prisma.project.findFirst({
    where: projectAccessWhere(user.id),
    orderBy: [{ organizationId: 'asc' }, { id: 'asc' }],
    select: { id: true },
  });
  if (!firstProject) throw new Error('The user has no project.');
  return firstProject.id;
};
