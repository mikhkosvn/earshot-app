import 'server-only';

import { MemberRole } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';

type MemberRef = {
  id: number;
  organizationId: number;
  role: MemberRole;
};

export const assertNotLastAdmin = async (member: MemberRef) => {
  if (member.role !== MemberRole.admin) return;
  const otherAdmins = await prisma.organizationMember.count({
    where: {
      organizationId: member.organizationId,
      role: MemberRole.admin,
      id: { not: member.id },
    },
  });
  if (otherAdmins === 0) {
    throw new ActionError('The organization needs at least one admin.', 409);
  }
};
