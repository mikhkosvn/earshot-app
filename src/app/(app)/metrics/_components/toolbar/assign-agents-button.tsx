'use client';

import { UsersIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { AssignAgentsDialog } from '../assign-agents/assign-agents-dialog';

type AssignAgentsButtonProps = {
  selectedIds: number[];
};

export function AssignAgentsButton({ selectedIds }: AssignAgentsButtonProps) {
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
        <UsersIcon />
        Assign Agents
      </Button>
      <AssignAgentsDialog
        open={open}
        onOpenChange={setOpen}
        metricIds={selectedIds}
      />
    </>
  );
}
