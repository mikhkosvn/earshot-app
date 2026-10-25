import { MemberRole } from '@/generated/prisma/enums';

export const MemberRoleLabel: Record<MemberRole, string> = {
  [MemberRole.admin]: 'Admin',
  [MemberRole.member]: 'Member',
  [MemberRole.view_only]: 'View only',
};
