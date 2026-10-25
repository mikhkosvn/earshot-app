'use client';

import { Suspense } from 'react';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import { MetricEvalTypeLabel } from '@/server/alerts/constants/metric-type-filter';
import type { AlertRow } from '@/server/alerts/types';

import { AlertFilterButton } from '../filter-editor/alert-filter-button';
import { AlertDirectionSelect } from './cells/alert-direction-select';
import { AlertEnabledSwitch } from './cells/alert-enabled-switch';
import { AlertFiresPill } from './cells/alert-fires-pill';
import { AlertNameButton } from './cells/alert-name-button';
import { AlertRowActions } from './cells/alert-row-actions';
import { AlertTypeSelect } from './cells/alert-type-select';

type AlertRowViewProps = {
  alert: AlertRow;
};

export function AlertRowView({ alert }: AlertRowViewProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-muted-foreground">
        #{alert.id}
      </TableCell>
      <TableCell className="max-w-64">
        <AlertNameButton alert={alert} />
      </TableCell>
      <TableCell>
        <AlertEnabledSwitch alert={alert} />
      </TableCell>
      <TableCell>
        <Suspense fallback={<Skeleton className="h-5 w-14" />}>
          <AlertFiresPill alertId={alert.id} />
        </Suspense>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-[11px] font-semibold">
          {MetricEvalTypeLabel[alert.metric.evalType]}
        </Badge>
      </TableCell>
      <TableCell>
        <AlertTypeSelect alert={alert} />
      </TableCell>
      <TableCell>
        <AlertFilterButton alert={alert} />
      </TableCell>
      <TableCell>
        <AlertDirectionSelect alert={alert} />
      </TableCell>
      <TableCell>
        <AlertRowActions alert={alert} />
      </TableCell>
    </TableRow>
  );
}
