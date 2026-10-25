import { TableCell, TableRow } from '@/components/ui/table';
import type { Timezone } from '@/generated/prisma/enums';
import type { MonitorRunItem } from '@/server/monitors/types';

import { formatMonitorDate } from '../../_utils/format-monitor-date';
import { MonitorRunError } from './monitor-run-error';
import { MonitorRunResultLink } from './monitor-run-result-link';
import { MonitorRunStatusBadge } from './monitor-run-status-badge';

interface MonitorRunRowProps {
  run: MonitorRunItem;
  timezone: Timezone;
}

export function MonitorRunRow({ run, timezone }: MonitorRunRowProps) {
  return (
    <TableRow>
      <TableCell className="tabular-nums">
        {formatMonitorDate(run.scheduledFor, timezone)}
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <MonitorRunStatusBadge status={run.status} />
          <MonitorRunError errorMessage={run.errorMessage} />
        </div>
      </TableCell>
      <TableCell>
        <MonitorRunResultLink run={run} />
      </TableCell>
    </TableRow>
  );
}
