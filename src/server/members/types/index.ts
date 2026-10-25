import type { z } from 'zod';

import type { MemberRole } from '@/generated/prisma/enums';
import type {
  listMembersSchema,
  removeMemberSchema,
  updateMemberRoleSchema,
} from '@/server/members/schemas';

export type ListMembersInput = z.input<typeof listMembersSchema>;
export type UpdateMemberRoleInput = z.input<typeof updateMemberRoleSchema>;
export type RemoveMemberInput = z.input<typeof removeMemberSchema>;

export type MemberRow = {
  id: number;
  userId: number;
  name: string;
  email: string;
  role: MemberRole;
  isCurrentUser: boolean;
  createdAt: Date;
};
