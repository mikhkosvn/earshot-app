import { TableCell, TableRow } from '@/components/ui/table';

interface RunsTableEmptyRowProps {
  count: number;
  columnCount: number;
}

export function RunsTableEmptyRow({
  count,
  columnCount,
}: RunsTableEmptyRowProps) {
  if (count > 0) return null;

  return (
    <TableRow>
      <TableCell
        role="status"
        colSpan={columnCount}
        className="h-24 text-center text-xs text-muted-foreground"
      >
        No runs found.
      </TableCell>
    </TableRow>
  );
}
