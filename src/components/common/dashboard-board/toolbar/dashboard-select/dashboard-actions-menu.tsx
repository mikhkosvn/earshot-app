'use client';

import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DashboardItem } from '@/server/dashboards/types';

import { useDuplicateDashboardMutation } from '../../_hooks/mutations/use-duplicate-dashboard-mutation';

interface DashboardActionsMenuProps {
  dashboard: DashboardItem;
  onRename: (dashboard: DashboardItem) => void;
  onDelete: (dashboard: DashboardItem) => void;
}

export function DashboardActionsMenu({
  dashboard,
  onRename,
  onDelete,
}: DashboardActionsMenuProps) {
  const duplicateDashboard = useDuplicateDashboardMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Dashboard actions for ${dashboard.name}`}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          />
        }
      >
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => onRename(dashboard)}>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={duplicateDashboard.isPending}
          onClick={() =>
            duplicateDashboard.mutate({ dashboardId: dashboard.id })
          }
        >
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(dashboard)}
        >
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
