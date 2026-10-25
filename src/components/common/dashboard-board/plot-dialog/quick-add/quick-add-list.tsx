'use client';

import { predefinedPlots } from '@/server/dashboards/constants/predefined-plots';

import { useQuickAddPlot } from '../../_hooks/use-quick-add-plot';
import type { DashboardBoardState } from '../../_utils/board-types';
import { QuickAddItem } from './quick-add-item';

type QuickAddListProps = {
  board: DashboardBoardState;
  onDone: () => void;
};

export function QuickAddList({ board, onDone }: QuickAddListProps) {
  const addPlot = useQuickAddPlot(board, onDone);

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-medium">Quick Add</h3>
      <ul className="divide-y rounded-lg border">
        {predefinedPlots(board.source).map((preset) => (
          <QuickAddItem
            key={preset.config.name}
            preset={preset}
            onAdd={addPlot}
          />
        ))}
      </ul>
      <div className="flex items-center gap-3 py-1 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or build your own
        <span className="h-px flex-1 bg-border" />
      </div>
    </section>
  );
}
