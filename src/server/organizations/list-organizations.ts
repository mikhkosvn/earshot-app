import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';

export const listOrganizations = async () => {
  const { user } = await requireUser();
  const organizations = await prisma.organization.findMany({
    where: { members: { some: { userId: user.id } } },
    orderBy: { id: 'asc' },
    select: { id: true, name: true },
  });
  addEventFields({ organizations: { count: organizations.length } });
  return organizations;
};
