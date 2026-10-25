'use client';

import { EllipsisVerticalIcon, PercentIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { MetricListItem } from '@/server/metrics/types';

import { MetricRowDialog } from '../../_constants/metric-row-dialog';
import { SamplingRateDialog } from '../sampling-rate/sampling-rate-dialog';
import { DeleteMetricDialog } from './delete-metric-dialog';

type MetricRowMenuProps = {
  metric: MetricListItem;
};

export function MetricRowMenu({ metric }: MetricRowMenuProps) {
  const [dialog, setDialog] = useState<MetricRowDialog | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for ${metric.name}`}
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="text-xs"
            disabled={!metric.samplingEnabled}
            onClick={() => setDialog(MetricRowDialog.samplingRate)}
          >
            <PercentIcon />
            Sampling rate
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            onClick={() => setDialog(MetricRowDialog.delete)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SamplingRateDialog
        metric={metric}
        open={dialog === MetricRowDialog.samplingRate}
        onOpenChange={handleOpenChange}
      />
      <DeleteMetricDialog
        metric={metric}
        open={dialog === MetricRowDialog.delete}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
