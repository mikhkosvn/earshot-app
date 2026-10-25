'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { alertWindowLabel } from '@/server/alerts/constants/alert-window';

import { useAlertWindow } from '../../_hooks/params/use-alert-window';
import { useFilteredAlerts } from '../../_hooks/use-filtered-alerts';
import { AlertRowView } from './alert-row-view';
import { AlertsTableEmptyRow } from './alerts-table-empty-row';

export function AlertsTable() {
  const alerts = useFilteredAlerts();
  const { hours } = useAlertWindow();

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">ID</TableHead>
          <TableHead>Alert Name</TableHead>
          <TableHead>Enabled</TableHead>
          <TableHead>Last {alertWindowLabel(hours)}</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Alert Type</TableHead>
          <TableHead>Filter</TableHead>
          <TableHead>Alert Direction</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AlertsTableEmptyRow count={alerts.length} />
        {alerts.map((alert) => (
          <AlertRowView key={alert.id} alert={alert} />
        ))}
      </TableBody>
    </Table>
  );
}
