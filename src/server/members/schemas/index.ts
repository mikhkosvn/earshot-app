import { z } from 'zod';

import { MemberRole } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

export const listMembersSchema = z.object({
  organizationId: idSchema,
});

export const updateMemberRoleSchema = z.object({
  memberId: idSchema,
  role: z.enum(MemberRole),
});

export const removeMemberSchema = z.object({
  memberId: idSchema,
});
