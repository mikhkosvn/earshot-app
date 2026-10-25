import { TableCell, TableRow } from '@/components/ui/table';

interface CallTableEmptyRowProps {
  count: number;
}

export function CallTableEmptyRow({ count }: CallTableEmptyRowProps) {
  if (count > 0) return null;

  return (
    <TableRow>
      <TableCell
        colSpan={10}
        className="h-24 text-center text-xs text-muted-foreground"
      >
        No calls match the filters.
      </TableCell>
    </TableRow>
  );
}
