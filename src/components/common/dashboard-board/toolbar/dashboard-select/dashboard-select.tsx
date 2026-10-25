'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { DashboardSource } from '@/generated/prisma/enums';
import type { DashboardItem } from '@/server/dashboards/types';

import { useDashboardDetailQuery } from '../../_hooks/queries/use-dashboard-detail-query';
import { useSelectDashboard } from '../../_hooks/use-select-dashboard';
import { CreateDashboardDialog } from './create-dashboard-dialog';
import { DashboardSelectList } from './dashboard-select-list';
import { DeleteDashboardDialog } from './delete-dashboard-dialog';
import { RenameDashboardDialog } from './rename-dashboard-dialog';

type DashboardSelectProps = {
  dashboardId: number;
  source: DashboardSource;
};

export function DashboardSelect({ dashboardId, source }: DashboardSelectProps) {
  const { data: dashboard } = useDashboardDetailQuery(dashboardId);
  const selectDashboard = useSelectDashboard(source);
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [renameTarget, setRenameTarget] = useState<DashboardItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DashboardItem | null>(null);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-label="Select dashboard"
              className="max-w-56 justify-between text-xs"
            />
          }
        >
          <span className="truncate">{dashboard.name}</span>
          <ChevronsUpDownIcon className="opacity-60" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-0">
          <DashboardSelectList
            source={source}
            currentDashboardId={dashboardId}
            onSelect={(id) => {
              setOpen(false);
              if (id === dashboardId) return;
              selectDashboard(id);
            }}
            onCreate={() => {
              setOpen(false);
              setCreating(true);
            }}
            onRename={(target) => {
              setOpen(false);
              setRenameTarget(target);
            }}
            onDelete={(target) => {
              setOpen(false);
              setDeleteTarget(target);
            }}
          />
        </PopoverContent>
      </Popover>
      <CreateDashboardDialog
        open={creating}
        source={source}
        onClose={() => setCreating(false)}
      />
      <RenameDashboardDialog
        dashboard={renameTarget}
        onClose={() => setRenameTarget(null)}
      />
      <DeleteDashboardDialog
        dashboard={deleteTarget}
        currentDashboardId={dashboardId}
        source={source}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
