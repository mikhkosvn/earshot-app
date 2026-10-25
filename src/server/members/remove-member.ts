import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { removeMemberSchema } from '@/server/members/schemas';
import { assertNotLastAdmin } from '@/server/members/utils/assert-not-last-admin';
import { findMemberForAdmin } from '@/server/members/utils/find-member-for-admin';

export const removeMember = withValidation(
  removeMemberSchema,
  async ({ memberId }) => {
    const { user, member } = await findMemberForAdmin(memberId);
    if (member.userId === user.id) {
      throw new ActionError('You cannot remove yourself.', 409);
    }
    await assertNotLastAdmin(member);
    await prisma.organizationMember.delete({ where: { id: member.id } });
    return { id: member.id, organizationId: member.organizationId };
  },
);
