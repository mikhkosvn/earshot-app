'use client';

import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ResultMetricTile } from '@/server/results/types';

import { METRIC_TILE_CLASS } from '../../../_constants/result-detail';
import { tileValueText } from '../../../_utils/tile-format';
import { MetricPopupDialog } from '../popup/metric-popup-dialog';
import { MetricTileBar } from './metric-tile-bar';

type MetricTileProps = {
  tile: ResultMetricTile;
};

export function MetricTile({ tile }: MetricTileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="unstyled"
        size="unstyled"
        className={cn(
          METRIC_TILE_CLASS,
          'justify-start border-border font-normal whitespace-normal hover:bg-muted/60',
        )}
        onClick={() => setOpen(true)}
      >
        <span className="min-w-0 flex-1 truncate font-medium">{tile.name}</span>
        <span className="font-semibold tabular-nums">
          {tileValueText(tile)}
        </span>
        <MetricTileBar tile={tile} />
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </Button>
      <MetricPopupDialog tile={tile} open={open} onOpenChange={setOpen} />
    </>
  );
}
