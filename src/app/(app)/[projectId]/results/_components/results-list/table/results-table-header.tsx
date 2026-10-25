'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { SelectPageCheckbox } from './select-page-checkbox';

const COLUMNS = [
  'ID',
  'Label',
  '# Evaluators',
  'Runs',
  'Agent',
  'Type',
  'Status',
  'Score',
  'Created At',
];

interface ResultsTableHeaderProps {
  selectedIds: readonly number[];
  onSelectedIdsChange: (ids: number[]) => void;
}

export function ResultsTableHeader({
  selectedIds,
  onSelectedIdsChange,
}: ResultsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead className="w-8">
          <SelectPageCheckbox
            selectedIds={selectedIds}
            onSelectedIdsChange={onSelectedIdsChange}
          />
        </TableHead>
        {COLUMNS.map((label) => (
          <TableHead key={label} className="whitespace-nowrap">
            {label}
          </TableHead>
        ))}
        <TableHead className="w-10" />
      </TableRow>
    </TableHeader>
  );
}
