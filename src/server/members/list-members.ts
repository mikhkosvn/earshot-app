import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listMembersSchema } from '@/server/members/schemas';
import type { MemberRow } from '@/server/members/types';
import { requireOrganizationAccess } from '@/server/organization-settings/utils/require-organization-access';

export const listMembers = withValidation(
  listMembersSchema,
  async ({ organizationId }): Promise<MemberRow[]> => {
    const { user } = await requireOrganizationAccess(organizationId);
    const members = await prisma.organizationMember.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        role: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return members.map((member) => ({
      id: member.id,
      userId: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.role,
      isCurrentUser: member.user.id === user.id,
      createdAt: member.createdAt,
    }));
  },
);
