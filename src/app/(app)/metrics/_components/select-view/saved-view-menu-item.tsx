'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { SavedViewItem } from '@/server/saved-views/types';

import { useViewParam } from '../../_hooks/use-view-param';

interface SavedViewMenuItemProps {
  view: SavedViewItem;
}

export function SavedViewMenuItem({ view }: SavedViewMenuItemProps) {
  const { viewId, setView } = useViewParam();

  return (
    <DropdownMenuItem
      data-current={viewId === view.id}
      className="text-xs data-[current=true]:bg-muted"
      onClick={() => setView(view.id)}
    >
      <span className="truncate">{view.name}</span>
    </DropdownMenuItem>
  );
}
