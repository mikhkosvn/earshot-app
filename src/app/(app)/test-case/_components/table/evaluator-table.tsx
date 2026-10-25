'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Table, TableBody } from '@/components/ui/table';

import { useEvaluatorListQuery } from '../../_hooks/use-evaluator-list-query';
import { EvaluatorEmptyState } from './evaluator-empty-state';
import { EvaluatorRow } from './row/evaluator-row';
import { EvaluatorTableHeader } from './header/evaluator-table-header';

type EvaluatorTableProps = {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
};

const toggleId = (ids: number[], id: number) => {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  return [...ids, id];
};

export function EvaluatorTable({
  selectedIds,
  onSelectionChange,
}: EvaluatorTableProps) {
  const { data } = useSuspenseQuery(useEvaluatorListQuery());
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const rowIds = data.rows.map((row) => row.id);

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <Table className="text-xs">
        <EvaluatorTableHeader
          rowIds={rowIds}
          selectedIds={selectedIds}
          onSelectionChange={onSelectionChange}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
        />
        <TableBody>
          {data.rows.map((row) => (
            <EvaluatorRow
              key={row.id}
              row={row}
              isSelected={selectedIds.includes(row.id)}
              onSelectToggle={() =>
                onSelectionChange(toggleId(selectedIds, row.id))
              }
              isExpanded={expandedIds.includes(row.id)}
              onExpandToggle={() =>
                setExpandedIds((ids) => toggleId(ids, row.id))
              }
            />
          ))}
        </TableBody>
      </Table>
      <EvaluatorEmptyState count={data.rows.length} />
    </div>
  );
}
