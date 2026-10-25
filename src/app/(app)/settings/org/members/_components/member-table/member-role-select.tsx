'use client';

import { MemberRoleLabel } from '@/app/(app)/settings/_constants/member-role-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MemberRole } from '@/generated/prisma/enums';
import type { MemberRow } from '@/server/members/types';

import { useUpdateMemberRoleMutation } from '../../_hooks/mutations/use-update-member-role-mutation';

const ROLE_ITEMS = Object.values(MemberRole).map((value) => ({
  value,
  label: MemberRoleLabel[value],
}));

type MemberRoleSelectProps = {
  member: MemberRow;
};

export function MemberRoleSelect({ member }: MemberRoleSelectProps) {
  const updateRole = useUpdateMemberRoleMutation();

  return (
    <Select
      items={ROLE_ITEMS}
      value={member.role}
      disabled={updateRole.isPending}
      onValueChange={(role) => {
        if (role === null || role === member.role) return;
        updateRole.mutate({ memberId: member.id, role });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={`Org role of ${member.email}`}
        className="w-32 bg-background text-xs font-medium"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROLE_ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
