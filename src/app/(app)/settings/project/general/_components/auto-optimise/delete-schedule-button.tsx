'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteScheduleMutation } from '../../_hooks/mutations/auto-optimise/use-delete-schedule-mutation';

interface DeleteScheduleButtonProps {
  scheduleId: number;
}

export function DeleteScheduleButton({
  scheduleId,
}: DeleteScheduleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteSchedule = useDeleteScheduleMutation();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Delete schedule"
        onClick={() => setIsOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        isPending={deleteSchedule.isPending}
        description="This action cannot be undone. The optimiser stops running on this schedule."
        onConfirm={() =>
          deleteSchedule.mutate(
            { scheduleId },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setIsOpen(false);
              },
            },
          )
        }
      />
    </>
  );
}
