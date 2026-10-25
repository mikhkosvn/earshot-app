import 'server-only';

import { MemberRole } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { updateMemberRoleSchema } from '@/server/members/schemas';
import { assertNotLastAdmin } from '@/server/members/utils/assert-not-last-admin';
import { findMemberForAdmin } from '@/server/members/utils/find-member-for-admin';

export const updateMemberRole = withValidation(
  updateMemberRoleSchema,
  async ({ memberId, role }) => {
    const { member } = await findMemberForAdmin(memberId);
    if (role !== MemberRole.admin) await assertNotLastAdmin(member);
    addEventFields({
      member: { id: member.id, role: member.role, next_role: role },
      organization: { id: member.organizationId },
    });
    return prisma.organizationMember.update({
      where: { id: member.id },
      data: { role },
      select: { id: true, organizationId: true, role: true },
    });
  },
);
