import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

export const listOrganizations = async () => {
  const { user } = await requireUser();
  return prisma.organization.findMany({
    where: { members: { some: { userId: user.id } } },
    orderBy: { id: 'asc' },
    select: { id: true, name: true },
  });
};
