'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { SavedViewItem } from '@/server/saved-views/types';

import { useApplySavedView } from '../../../_hooks/results-list/use-apply-saved-view';
import { useCurrentSavedView } from '../../../_hooks/results-list/use-current-saved-view';

interface SavedViewMenuItemProps {
  view: SavedViewItem;
}

export function SavedViewMenuItem({ view }: SavedViewMenuItemProps) {
  const current = useCurrentSavedView();
  const applySavedView = useApplySavedView();

  return (
    <DropdownMenuItem
      data-current={current?.id === view.id}
      className="text-xs data-[current=true]:bg-muted"
      onClick={() => applySavedView(view.agentIds)}
    >
      <span className="truncate">{view.name}</span>
    </DropdownMenuItem>
  );
}
