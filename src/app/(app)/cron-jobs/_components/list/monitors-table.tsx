'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useMonitorListQuery } from '../../_hooks/use-monitor-list-query';
import { MonitorRow } from './monitor-row';

export function MonitorsTable() {
  const { data } = useMonitorListQuery();

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border bg-background">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Runs</TableHead>
              <TableHead>Scenarios</TableHead>
              <TableHead>Timezone</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((monitor) => (
              <MonitorRow key={monitor.id} monitor={monitor} />
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination totalCount={data.count} />
    </div>
  );
}
