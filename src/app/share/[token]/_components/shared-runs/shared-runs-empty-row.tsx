import { TableCell, TableRow } from '@/components/ui/table';

import { SHARED_RUN_COLUMNS } from '../../_constants/run-columns';

type SharedRunsEmptyRowProps = {
  count: number;
};

export function SharedRunsEmptyRow({ count }: SharedRunsEmptyRowProps) {
  if (count > 0) return null;

  return (
    <TableRow>
      <TableCell
        colSpan={SHARED_RUN_COLUMNS.length}
        className="h-24 text-center text-xs text-muted-foreground"
      >
        This result has no runs.
      </TableCell>
    </TableRow>
  );
}
