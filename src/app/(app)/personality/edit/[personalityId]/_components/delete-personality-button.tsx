'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useOpenPersonalityList } from '../../../_hooks/form/use-open-personality-list';
import { usePersonalityDetail } from '../../../_hooks/form/use-personality-detail';
import { useDeletePersonalityMutation } from '../../../_hooks/mutations/form/use-delete-personality-mutation';

export function DeletePersonalityButton() {
  const personality = usePersonalityDetail();
  const openList = useOpenPersonalityList();
  const deletePersonality = useDeletePersonalityMutation();
  const [open, setOpen] = useState(false);
  if (personality.isGlobal) return null;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2Icon />
        Delete
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        isPending={deletePersonality.isPending}
        onConfirm={() =>
          deletePersonality.mutate(
            { personalityId: personality.id },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setOpen(false);
                openList();
              },
            },
          )
        }
      />
    </>
  );
}
