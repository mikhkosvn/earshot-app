'use client';

import { HistoryIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { EditMonitorDialog } from '@/components/common/monitor-dialog/edit-monitor-dialog';
import { Button } from '@/components/ui/button';
import type { MonitorListItem } from '@/server/monitors/types';

import { MonitorHistoryDialog } from '../../history/monitor-history-dialog';
import { DeleteMonitorDialog } from './delete-monitor-dialog';

interface MonitorRowActionsProps {
  monitor: MonitorListItem;
}

export function MonitorRowActions({ monitor }: MonitorRowActionsProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Run history"
        onClick={() => setHistoryOpen(true)}
      >
        <HistoryIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Edit monitor"
        onClick={() => setEditOpen(true)}
      >
        <PencilIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Delete monitor"
        className="text-destructive hover:text-destructive"
        onClick={() => setDeleteOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <MonitorHistoryDialog
        monitor={monitor}
        open={historyOpen}
        onOpenChange={setHistoryOpen}
      />
      <EditMonitorDialog
        monitorId={monitor.id}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteMonitorDialog
        monitorId={monitor.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
