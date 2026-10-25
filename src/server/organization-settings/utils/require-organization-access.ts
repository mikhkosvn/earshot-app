import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

export const requireOrganizationAccess = async (organizationId: number) => {
  const { user } = await requireUser();
  const membership = await prisma.organizationMember.findUniqueOrThrow({
    where: { organizationId_userId: { organizationId, userId: user.id } },
    select: { role: true },
  });
  return { user, organizationId, role: membership.role };
};
