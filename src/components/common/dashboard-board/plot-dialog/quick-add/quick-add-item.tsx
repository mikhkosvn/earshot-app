'use client';

import { ActivityIcon, PlusIcon, TrendingUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  type PredefinedPlot,
  PredefinedPlotIcon,
} from '@/server/dashboards/constants/predefined-plots';

const ICONS = {
  [PredefinedPlotIcon.activity]: ActivityIcon,
  [PredefinedPlotIcon.trendingUp]: TrendingUpIcon,
};

type QuickAddItemProps = {
  preset: PredefinedPlot;
  onAdd: (preset: PredefinedPlot) => void;
};

export function QuickAddItem({ preset, onAdd }: QuickAddItemProps) {
  const Icon = ICONS[preset.icon];

  return (
    <li>
      <Button
        type="button"
        variant="unstyled"
        size="unstyled"
        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted"
        onClick={() => onAdd(preset)}
      >
        <span className="flex size-7 items-center justify-center rounded-md border">
          <Icon className="size-4" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm">{preset.config.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {preset.description}
          </span>
        </span>
        <PlusIcon className="size-4 text-muted-foreground" />
      </Button>
    </li>
  );
}
