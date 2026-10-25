'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import { Table, TableBody } from '@/components/ui/table';

import { useResultListQuery } from '../../../_hooks/results-list/use-result-list-query';
import { ResultRow } from './result-row';
import { ResultsTableEmptyRow } from './results-table-empty-row';
import { ResultsTableHeader } from './results-table-header';

type ResultsTableProps = {
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
};

const toggled = (ids: number[], id: number, checked: boolean) => {
  if (checked) return [...ids, id];
  return ids.filter((item) => item !== id);
};

export function ResultsTable({
  selectedIds,
  onSelectedIdsChange,
}: ResultsTableProps) {
  const { data } = useResultListQuery();

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-x-auto rounded-lg border bg-background">
        <Table className="text-xs">
          <ResultsTableHeader
            selectedIds={selectedIds}
            onSelectedIdsChange={onSelectedIdsChange}
          />
          <TableBody>
            {data.rows.map((result) => (
              <ResultRow
                key={result.id}
                result={result}
                selected={selectedIds.includes(result.id)}
                onSelectedChange={(checked) =>
                  onSelectedIdsChange(toggled(selectedIds, result.id, checked))
                }
                onDeleted={(resultId) =>
                  onSelectedIdsChange(
                    selectedIds.filter((id) => id !== resultId),
                  )
                }
              />
            ))}
            <ResultsTableEmptyRow count={data.rows.length} />
          </TableBody>
        </Table>
      </div>
      <TablePagination totalCount={data.count} />
    </div>
  );
}
