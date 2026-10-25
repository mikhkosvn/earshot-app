'use client';

import { TableCell, TableRow } from '@/components/ui/table';

import { usePhoneNumbers } from '../../_hooks/use-phone-numbers';

const COLUMN_COUNT = 5;

export function PhoneNumberTableEmpty() {
  const phoneNumbers = usePhoneNumbers();
  if (phoneNumbers.length > 0) return null;

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={COLUMN_COUNT}
        className="h-32 text-center text-sm text-foreground"
      >
        No phone numbers imported yet
      </TableCell>
    </TableRow>
  );
}
