'use client';

import { IdChip } from '@/components/common/clipboard/id-chip';
import { TableCell, TableRow } from '@/components/ui/table';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';
import type { MonitorListItem } from '@/server/monitors/types';

import { formatMonitorDate } from '../../_utils/format-monitor-date';
import { MonitorStatusSwitch } from './monitor-status-switch';
import { MonitorRowActions } from './row-actions/monitor-row-actions';

type MonitorRowProps = {
  monitor: MonitorListItem;
};

export function MonitorRow({ monitor }: MonitorRowProps) {
  return (
    <TableRow>
      <TableCell>
        <IdChip id={`#${monitor.id}`} />
      </TableCell>
      <TableCell className="max-w-64 truncate font-medium">
        {monitor.name}
      </TableCell>
      <TableCell>
        <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px]">
          {monitor.cronExpression}
        </code>
      </TableCell>
      <TableCell className="tabular-nums">{monitor.agentId}</TableCell>
      <TableCell className="tabular-nums">{monitor.frequency}</TableCell>
      <TableCell>
        <span className="rounded-md border px-1.5 py-0.5 font-medium tabular-nums">
          {monitor.scenarioCount}
        </span>
      </TableCell>
      <TableCell>{TimezoneLabel[monitor.timezone]}</TableCell>
      <TableCell className="tabular-nums">
        {formatMonitorDate(monitor.nextRunAt, monitor.timezone)}
      </TableCell>
      <TableCell>
        <MonitorStatusSwitch monitor={monitor} />
      </TableCell>
      <TableCell>
        <MonitorRowActions monitor={monitor} />
      </TableCell>
    </TableRow>
  );
}
