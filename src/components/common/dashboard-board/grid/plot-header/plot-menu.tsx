'use client';

import {
  CopyIcon,
  EllipsisVerticalIcon,
  RefreshCwIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DraftActionType } from '../../_constants/draft-action-type';
import { useRefreshPlot } from '../../_hooks/use-refresh-plot';
import type { DashboardBoardState } from '../../_utils/board-types';
import type { DraftPlot } from '../../_utils/dashboard-draft';
import { DeletePlotDialog } from './delete-plot-dialog';
import { EditPlotMenuItem } from './edit-plot-menu-item';

type PlotMenuProps = {
  board: DashboardBoardState;
  plot: DraftPlot;
};

export function PlotMenu({ board, plot }: PlotMenuProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const refresh = useRefreshPlot(board, plot.config);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Plot actions for ${plot.config.name}`}
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <EditPlotMenuItem board={board} plot={plot} />
          <DropdownMenuItem
            onClick={() =>
              board.dispatch({
                type: DraftActionType.duplicate,
                key: plot.key,
                newKey: crypto.randomUUID(),
              })
            }
          >
            <CopyIcon />
            Duplicate Plot
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              void refresh();
            }}
          >
            <RefreshCwIcon />
            Refresh Data
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2Icon />
            Delete Plot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePlotDialog
        open={confirmOpen}
        name={plot.config.name}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          setConfirmOpen(false);
          board.dispatch({ type: DraftActionType.remove, key: plot.key });
        }}
      />
    </>
  );
}
