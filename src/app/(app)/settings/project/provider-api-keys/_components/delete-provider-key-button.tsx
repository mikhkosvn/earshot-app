'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import type { ProviderKeyProvider } from '@/generated/prisma/enums';

import { useDeleteProviderApiKeyMutation } from '../_hooks/mutations/use-delete-provider-api-key-mutation';

interface DeleteProviderKeyButtonProps {
  provider: ProviderKeyProvider;
  label: string;
  isConfigured: boolean;
}

export function DeleteProviderKeyButton({
  provider,
  label,
  isConfigured,
}: DeleteProviderKeyButtonProps) {
  const projectId = useCurrentProjectId();
  const [isOpen, setIsOpen] = useState(false);
  const deleteKey = useDeleteProviderApiKeyMutation();
  if (!isConfigured) return null;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete ${label}`}
        className="text-destructive hover:text-destructive"
        onClick={() => setIsOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        isPending={deleteKey.isPending}
        description={`This action cannot be undone. The saved ${label} is removed from this project.`}
        onConfirm={() =>
          deleteKey.mutate(
            { projectId, provider },
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
