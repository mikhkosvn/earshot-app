'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import type { MemberRow } from '@/server/members/types';

import { MemberPersonCell } from './member-person-cell';
import { MemberProjectsCell } from './member-projects-cell';
import { MemberRoleCell } from './member-role-cell';
import { RemoveMemberButton } from './remove-member-button';

type MemberRowItemProps = {
  member: MemberRow;
};

export function MemberRowItem({ member }: MemberRowItemProps) {
  return (
    <TableRow>
      <TableCell className="pl-3">
        <MemberPersonCell member={member} />
      </TableCell>
      <TableCell>
        <MemberRoleCell member={member} />
      </TableCell>
      <TableCell>
        <MemberProjectsCell member={member} />
      </TableCell>
      <TableCell className="pr-3 text-right">
        <RemoveMemberButton member={member} />
      </TableCell>
    </TableRow>
  );
}
