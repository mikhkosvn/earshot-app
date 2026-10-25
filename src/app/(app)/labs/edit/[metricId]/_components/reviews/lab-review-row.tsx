'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { LabRowView } from '@/server/labs/types';

import { ActualValueCell } from './cells/actual/actual-value-cell';
import { ExpectedValueCell } from './cells/expected-value-cell';
import { ExplanationCell } from './cells/explanation-cell';
import { NotesCell } from './cells/notes-cell';
import { RecordingCell } from './cells/recording/recording-cell';

type LabReviewRowProps = {
  row: LabRowView;
  position: number;
  isSelected: boolean;
  onSelectedChange: (checked: boolean) => void;
};

const CELL_CLASS = 'border-r align-middle whitespace-normal last:border-r-0';

export function LabReviewRow({
  row,
  position,
  isSelected,
  onSelectedChange,
}: LabReviewRowProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className={CELL_CLASS}>
        <Checkbox
          aria-label={`Select row ${position}`}
          checked={isSelected}
          onCheckedChange={(checked) => onSelectedChange(checked === true)}
        />
      </TableCell>
      <TableCell className={cn(CELL_CLASS, 'font-medium')}>{position}</TableCell>
      <TableCell className={CELL_CLASS}>
        <RecordingCell row={row} />
      </TableCell>
      <TableCell className={CELL_CLASS}>
        <ExpectedValueCell row={row} />
      </TableCell>
      <TableCell
        className={cn(
          CELL_CLASS,
          !row.matched && 'bg-red-100 dark:bg-red-950/50',
        )}
      >
        <ActualValueCell row={row} />
      </TableCell>
      <TableCell className={CELL_CLASS}>
        <ExplanationCell explanation={row.explanation} />
      </TableCell>
      <TableCell className={CELL_CLASS}>
        <NotesCell row={row} />
      </TableCell>
    </TableRow>
  );
}
