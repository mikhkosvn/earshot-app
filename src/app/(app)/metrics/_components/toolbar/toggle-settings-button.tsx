'use client';

import { SettingsIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ToggleSettingsDialog } from '../toggle-settings/toggle-settings-dialog';

type ToggleSettingsButtonProps = {
  selectedIds: number[];
};

export function ToggleSettingsButton({
  selectedIds,
}: ToggleSettingsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
        Toggle Settings
      </Button>
      <ToggleSettingsDialog
        open={open}
        onOpenChange={setOpen}
        metricIds={selectedIds}
      />
    </>
  );
}
