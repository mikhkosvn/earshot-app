'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import { Table, TableBody } from '@/components/ui/table';

import { useCallListQuery } from '../../_hooks/call-list/use-call-list-query';
import { CallRow } from './call-row';
import { CallTableEmptyRow } from './call-table-empty-row';
import { CallTableHeader } from './call-table-header';

type CallTableProps = {
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
};

const toggled = (ids: number[], id: number, checked: boolean) => {
  if (checked) return [...ids, id];
  return ids.filter((item) => item !== id);
};

export function CallTable({
  selectedIds,
  onSelectedIdsChange,
}: CallTableProps) {
  const { data } = useCallListQuery();

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-x-auto rounded-lg border bg-background">
        <Table className="text-xs">
          <CallTableHeader
            selectedIds={selectedIds}
            onSelectedIdsChange={onSelectedIdsChange}
          />
          <TableBody>
            {data.rows.map((call) => (
              <CallRow
                key={call.id}
                call={call}
                selected={selectedIds.includes(call.id)}
                onSelectedChange={(checked) =>
                  onSelectedIdsChange(toggled(selectedIds, call.id, checked))
                }
              />
            ))}
            <CallTableEmptyRow count={data.rows.length} />
          </TableBody>
        </Table>
      </div>
      <TablePagination totalCount={data.count} />
    </div>
  );
}
