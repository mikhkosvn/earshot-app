'use client';

import { BotIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { MetricListItem } from '@/server/metrics/types';

import { ManageMetricDialog } from '../manage-agents/manage-metric-dialog';

interface ManageAgentsButtonProps {
  metric: MetricListItem;
}

export function ManageAgentsButton({ metric }: ManageAgentsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        aria-label={`Manage agents of ${metric.name}`}
        onClick={() => setOpen(true)}
      >
        <BotIcon />
      </Button>
      <ManageMetricDialog metric={metric} open={open} onOpenChange={setOpen} />
    </>
  );
}
