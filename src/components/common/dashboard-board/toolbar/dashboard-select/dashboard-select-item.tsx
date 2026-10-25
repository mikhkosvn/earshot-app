'use client';

import { CommandItem } from '@/components/ui/command';
import type { DashboardItem } from '@/server/dashboards/types';

import { DashboardActionsMenu } from './dashboard-actions-menu';

interface DashboardSelectItemProps {
  dashboard: DashboardItem;
  isCurrent: boolean;
  onSelect: (dashboardId: number) => void;
  onRename: (dashboard: DashboardItem) => void;
  onDelete: (dashboard: DashboardItem) => void;
}

export function DashboardSelectItem({
  dashboard,
  isCurrent,
  onSelect,
  onRename,
  onDelete,
}: DashboardSelectItemProps) {
  return (
    <CommandItem
      value={`${dashboard.name} ${dashboard.id}`}
      data-checked={isCurrent}
      onSelect={() => onSelect(dashboard.id)}
      className="text-xs"
    >
      <span className="min-w-0 flex-1 truncate">{dashboard.name}</span>
      <DashboardActionsMenu
        dashboard={dashboard}
        onRename={onRename}
        onDelete={onDelete}
      />
    </CommandItem>
  );
}
