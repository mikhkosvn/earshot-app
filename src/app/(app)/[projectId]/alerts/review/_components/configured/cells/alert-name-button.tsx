'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { AlertRow } from '@/server/alerts/types';

import { EditAlertDialog } from '../../edit-alert/edit-alert-dialog';

type AlertNameButtonProps = {
  alert: AlertRow;
};

export function AlertNameButton({ alert }: AlertNameButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="unstyled"
        size="unstyled"
        className="max-w-full truncate text-left text-xs font-medium hover:underline"
        onClick={() => setOpen(true)}
      >
        {alert.name}
      </Button>
      <EditAlertDialog alert={alert} open={open} onOpenChange={setOpen} />
    </>
  );
}
