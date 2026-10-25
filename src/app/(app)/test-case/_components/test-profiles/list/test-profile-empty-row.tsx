import { TableCell, TableRow } from '@/components/ui/table';

type TestProfileEmptyRowProps = {
  count: number;
};

export function TestProfileEmptyRow({ count }: TestProfileEmptyRowProps) {
  if (count > 0) return null;
  return (
    <TableRow>
      <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
        No test profiles found.
      </TableCell>
    </TableRow>
  );
}
