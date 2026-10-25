import { TableCell, TableRow } from '@/components/ui/table';

const COLUMN_COUNT = 11;

type ResultsTableEmptyRowProps = {
  count: number;
};

export function ResultsTableEmptyRow({ count }: ResultsTableEmptyRowProps) {
  if (count > 0) return null;

  return (
    <TableRow>
      <TableCell
        colSpan={COLUMN_COUNT}
        className="h-24 text-center text-xs text-muted-foreground"
      >
        No results yet.
      </TableCell>
    </TableRow>
  );
}
