import { TableCell, TableRow } from '@/components/ui/table';

type AgentsEmptyRowProps = {
  count: number;
};

export function AgentsEmptyRow({ count }: AgentsEmptyRowProps) {
  if (count > 0) return null;

  return (
    <TableRow>
      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
        No agents found.
      </TableCell>
    </TableRow>
  );
}
