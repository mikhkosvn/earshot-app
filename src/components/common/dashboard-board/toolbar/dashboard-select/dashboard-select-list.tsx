'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import type { DashboardSource } from '@/generated/prisma/enums';
import type { DashboardItem } from '@/server/dashboards/types';

import { useDashboardListQuery } from '../../_hooks/queries/use-dashboard-list-query';
import { DashboardSelectItem } from './dashboard-select-item';

interface DashboardSelectListProps {
  source: DashboardSource;
  currentDashboardId: number;
  onSelect: (dashboardId: number) => void;
  onCreate: () => void;
  onRename: (dashboard: DashboardItem) => void;
  onDelete: (dashboard: DashboardItem) => void;
}

export function DashboardSelectList({
  source,
  currentDashboardId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}: DashboardSelectListProps) {
  const { data: dashboards } = useDashboardListQuery(source);

  return (
    <Command>
      <CommandInput placeholder="Search dashboards..." className="text-xs" />
      <CommandList>
        <CommandEmpty className="py-4 text-xs">
          No dashboards found.
        </CommandEmpty>
        <CommandGroup>
          {dashboards.map((dashboard) => (
            <DashboardSelectItem
              key={dashboard.id}
              dashboard={dashboard}
              isCurrent={dashboard.id === currentDashboardId}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </CommandGroup>
      </CommandList>
      <div className="border-t p-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs"
          onClick={onCreate}
        >
          <PlusIcon />
          New dashboard
        </Button>
      </div>
    </Command>
  );
}
