import { TableCell, TableRow } from '@/components/ui/table';
import type { EvaluatorListRow } from '@/server/evaluators/types';

const COLUMN_COUNT = 13;

interface EvaluatorRowDetailsProps {
  row: EvaluatorListRow;
  isExpanded: boolean;
}

export function EvaluatorRowDetails({
  row,
  isExpanded,
}: EvaluatorRowDetailsProps) {
  if (!isExpanded) return null;

  return (
    <TableRow className="bg-muted/30 hover:bg-muted/30">
      <TableCell colSpan={COLUMN_COUNT} className="whitespace-normal">
        <div className="grid gap-4 p-2 md:grid-cols-2">
          <section className="flex flex-col gap-1">
            <h3 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Instructions
            </h3>
            <p className="text-xs whitespace-pre-wrap">{row.instructions}</p>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Expected Outcome
            </h3>
            <p className="text-xs whitespace-pre-wrap">
              {row.expectedOutcomePrompt || '-'}
            </p>
          </section>
        </div>
      </TableCell>
    </TableRow>
  );
}
