'use client';

import { TableCell, TableRow } from '@/components/ui/table';

import { useFilteredMembers } from '../../_hooks/use-filtered-members';

const COLUMN_COUNT = 4;

export function MemberTableEmpty() {
  const members = useFilteredMembers();
  if (members.length > 0) return null;

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={COLUMN_COUNT}
        className="h-24 text-center text-sm text-muted-foreground"
      >
        No people match your search.
      </TableCell>
    </TableRow>
  );
}
