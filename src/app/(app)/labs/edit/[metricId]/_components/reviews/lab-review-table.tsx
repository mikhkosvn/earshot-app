'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useLab } from '../../_hooks/lab/use-lab';
import { LabReviewRow } from './lab-review-row';
import { SelectAllRowsCheckbox } from './select-all-rows-checkbox';

type LabReviewTableProps = {
  selected: number[];
  onSelectedChange: (selected: number[]) => void;
};

const toggleId = (selected: number[], id: number, checked: boolean) => {
  if (checked) return [...new Set([...selected, id])];
  return selected.filter((item) => item !== id);
};

export function LabReviewTable({
  selected,
  onSelectedChange,
}: LabReviewTableProps) {
  const { rows } = useLab();

  return (
    <div className="rounded-lg border bg-background p-3">
      <Table>
        <TableHeader className="bg-muted [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">
              <SelectAllRowsCheckbox
                selected={selected}
                onSelectedChange={onSelectedChange}
              />
            </TableHead>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Recording</TableHead>
            <TableHead className="text-center">Expected Value</TableHead>
            <TableHead className="text-center">Actual Value</TableHead>
            <TableHead>Explanation</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <LabReviewRow
              key={row.reviewId}
              row={row}
              position={index + 1}
              isSelected={selected.includes(row.testSetId)}
              onSelectedChange={(checked) =>
                onSelectedChange(toggleId(selected, row.testSetId, checked))
              }
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
