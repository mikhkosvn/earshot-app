import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';

export const requireOrganizationAccess = async (organizationId: number) => {
  const { user } = await requireUser();
  const membership = await prisma.organizationMember.findUniqueOrThrow({
    where: { organizationId_userId: { organizationId, userId: user.id } },
    select: { role: true },
  });
  addEventFields({
    organization: { id: organizationId },
    membership: { role: membership.role },
  });
  return { user, organizationId, role: membership.role };
};
