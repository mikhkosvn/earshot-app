'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Timezone } from '@/generated/prisma/enums';

import { useMonitorRunsQuery } from '../../_hooks/use-monitor-runs-query';
import { MonitorRunRow } from './monitor-run-row';

interface MonitorRunListProps {
  monitorId: number;
  timezone: Timezone;
}

export function MonitorRunList({ monitorId, timezone }: MonitorRunListProps) {
  const { data: runs } = useMonitorRunsQuery(monitorId);
  if (runs.length === 0) {
    return (
      <p className="py-8 text-center text-xs text-muted-foreground">
        This monitor has not run yet.
      </p>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto rounded-lg border">
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            <TableHead>Scheduled time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <MonitorRunRow key={run.id} run={run} timezone={timezone} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
