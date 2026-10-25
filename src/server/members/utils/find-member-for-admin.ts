import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';

export const findMemberForAdmin = async (memberId: number) => {
  const { user } = await requireUser();
  const member = await prisma.organizationMember.findUniqueOrThrow({
    where: {
      id: memberId,
      organization: { members: { some: { userId: user.id } } },
    },
    select: { id: true, organizationId: true, userId: true, role: true },
  });
  await requireOrganizationAdmin(member.organizationId);
  return { user, member };
};
