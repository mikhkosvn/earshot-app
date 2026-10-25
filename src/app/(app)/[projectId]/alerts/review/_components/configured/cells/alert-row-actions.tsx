'use client';

import { SettingsIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { AlertRow } from '@/server/alerts/types';

import { hasEditableParams } from '../../../_utils/alert-params';
import { EditAlertDialog } from '../../edit-alert/edit-alert-dialog';
import { DeleteAlertDialog } from './delete-alert-dialog';

interface AlertRowActionsProps {
  alert: AlertRow;
}

export function AlertRowActions({ alert }: AlertRowActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Settings of ${alert.name}`}
        disabled={!hasEditableParams(alert.type)}
        onClick={() => setEditOpen(true)}
      >
        <SettingsIcon />
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        aria-label={`Delete ${alert.name}`}
        onClick={() => setDeleteOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <EditAlertDialog
        alert={alert}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteAlertDialog
        alertId={alert.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
