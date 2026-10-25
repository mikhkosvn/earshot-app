'use client';

import { MemberRoleLabel } from '@/app/(app)/settings/_constants/member-role-label';
import { Badge } from '@/components/ui/badge';
import type { MemberRow } from '@/server/members/types';

import { useIsOrganizationAdmin } from '../../_hooks/use-is-organization-admin';
import { MemberRoleSelect } from './member-role-select';

type MemberRoleCellProps = {
  member: MemberRow;
};

export function MemberRoleCell({ member }: MemberRoleCellProps) {
  const isAdmin = useIsOrganizationAdmin();

  if (!isAdmin) {
    return <Badge variant="outline">{MemberRoleLabel[member.role]}</Badge>;
  }
  return <MemberRoleSelect member={member} />;
}
