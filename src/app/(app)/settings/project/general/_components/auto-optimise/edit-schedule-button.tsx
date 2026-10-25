'use client';

import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';

import { EditScheduleDialog } from './form/edit-schedule-dialog';

interface EditScheduleButtonProps {
  schedule: OptimizerScheduleView;
}

export function EditScheduleButton({ schedule }: EditScheduleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Edit schedule"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <EditScheduleDialog
        schedule={schedule}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
