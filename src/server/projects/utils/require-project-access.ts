import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

export const requireProjectAccess = async (projectId: number) => {
  const { user } = await requireUser();
  const { organization, ...project } = await prisma.project.findUniqueOrThrow({
    where: {
      id: projectId,
      organization: { members: { some: { userId: user.id } } },
    },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          members: { where: { userId: user.id }, select: { role: true } },
        },
      },
    },
  });
  const [membership] = organization.members;

  return {
    user,
    project: {
      ...project,
      organization: { id: organization.id, name: organization.name },
    },
    role: membership.role,
  };
};
