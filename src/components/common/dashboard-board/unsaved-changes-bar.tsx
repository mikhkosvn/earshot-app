'use client';

import { SaveIcon, Undo2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DraftActionType } from './_constants/draft-action-type';
import { useSaveDashboardChangesMutation } from './_hooks/mutations/use-save-dashboard-changes-mutation';
import { useDashboardDetailQuery } from './_hooks/queries/use-dashboard-detail-query';
import type { DashboardBoardState } from './_utils/board-types';
import { hasPendingChanges, pendingLabel } from './_utils/pending-summary';

interface UnsavedChangesBarProps {
  board: DashboardBoardState;
}

export function UnsavedChangesBar({ board }: UnsavedChangesBarProps) {
  const { data: saved } = useDashboardDetailQuery(board.dashboardId);
  const save = useSaveDashboardChangesMutation();
  const { draft } = board;

  if (!hasPendingChanges(draft)) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900 dark:bg-amber-950/40">
      <p className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
        <span aria-hidden className="size-2 rounded-full bg-amber-500" />
        {pendingLabel(draft)}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={save.isPending}
          onClick={() =>
            board.dispatch({ type: DraftActionType.reset, detail: saved })
          }
        >
          <Undo2Icon />
          Discard
        </Button>
        <Button
          size="sm"
          disabled={save.isPending}
          className="bg-orange-500 text-white hover:bg-orange-600"
          onClick={() =>
            save.mutate(
              {
                dashboardId: board.dashboardId,
                filters: draft.filters,
                plots: draft.plots.map((plot) => ({
                  id: plot.id,
                  config: plot.config,
                })),
              },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  board.dispatch({
                    type: DraftActionType.reset,
                    detail: result.data,
                  });
                },
              },
            )
          }
        >
          <SaveIcon />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
