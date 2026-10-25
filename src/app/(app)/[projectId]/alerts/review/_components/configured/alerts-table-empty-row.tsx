import { TableCell, TableRow } from '@/components/ui/table';

const COLUMN_COUNT = 9;

interface AlertsTableEmptyRowProps {
  count: number;
}

export function AlertsTableEmptyRow({ count }: AlertsTableEmptyRowProps) {
  if (count > 0) return null;
  return (
    <TableRow>
      <TableCell
        colSpan={COLUMN_COUNT}
        className="h-24 text-center text-muted-foreground"
      >
        No alerts found
      </TableCell>
    </TableRow>
  );
}
