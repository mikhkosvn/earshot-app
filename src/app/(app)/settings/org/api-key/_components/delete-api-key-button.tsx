'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteApiKeyMutation } from '../_hooks/mutations/use-delete-api-key-mutation';

type DeleteApiKeyButtonProps = {
  apiKeyId: number;
  label: string;
};

export function DeleteApiKeyButton({
  apiKeyId,
  label,
}: DeleteApiKeyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteApiKey = useDeleteApiKeyMutation();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`Delete API key ${label}`}
        className="text-destructive hover:text-destructive"
        onClick={() => setIsOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        isPending={deleteApiKey.isPending}
        description="This action cannot be undone. Requests that use this key will stop working."
        onConfirm={() =>
          deleteApiKey.mutate(
            { apiKeyId },
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
