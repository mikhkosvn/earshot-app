'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { SHARED_RUN_COLUMNS } from '../../_constants/run-columns';
import { RUN_PAGE_PARAM } from '../../_constants/share-params';
import { useSharedRuns } from '../../_hooks/use-shared-runs';
import { SharedRunRow } from './shared-run-row';
import { SharedRunsEmptyRow } from './shared-runs-empty-row';

export function SharedRunsCard() {
  const { rows, count } = useSharedRuns();

  return (
    <section className="flex flex-col gap-3 rounded-lg border bg-background p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold">Runs</h2>
        <Badge variant="secondary">{count}</Badge>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              {SHARED_RUN_COLUMNS.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((run) => (
              <SharedRunRow key={run.id} run={run} />
            ))}
            <SharedRunsEmptyRow count={rows.length} />
          </TableBody>
        </Table>
      </div>
      <TablePagination totalCount={count} pageParamKey={RUN_PAGE_PARAM} />
    </section>
  );
}
