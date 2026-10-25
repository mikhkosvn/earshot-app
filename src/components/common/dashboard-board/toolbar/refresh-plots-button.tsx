'use client';

import { RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useRefreshPlots } from '../_hooks/use-refresh-plots';

type RefreshPlotsButtonProps = {
  dashboardId: number;
};

export function RefreshPlotsButton({ dashboardId }: RefreshPlotsButtonProps) {
  const refresh = useRefreshPlots(dashboardId);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Refresh all plots"
            onClick={() => {
              void refresh();
            }}
          />
        }
      >
        <RefreshCwIcon />
      </TooltipTrigger>
      <TooltipContent>Refresh all plots</TooltipContent>
    </Tooltip>
  );
}
