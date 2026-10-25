'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useFilteredMembers } from '../../_hooks/use-filtered-members';
import { MemberRowItem } from './member-row-item';
import { MemberTableEmpty } from './member-table-empty';

export function MemberTable() {
  const members = useFilteredMembers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-3 text-xs">Person</TableHead>
          <TableHead className="text-xs">Org role</TableHead>
          <TableHead className="text-xs">Projects</TableHead>
          <TableHead className="w-12 pr-3">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <MemberRowItem key={member.id} member={member} />
        ))}
        <MemberTableEmpty />
      </TableBody>
    </Table>
  );
}
