'use client';

import { CopyIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import type { TestProfileView } from '@/server/test-profiles/types';

import { useDeleteTestProfileMutation } from '@/app/(app)/test-case/_hooks/mutations/test-profiles/use-delete-test-profile-mutation';
import { useDuplicateTestProfileMutation } from '@/app/(app)/test-case/_hooks/mutations/test-profiles/use-duplicate-test-profile-mutation';

interface TestProfileRowActionsProps {
  profile: TestProfileView;
  onEdit: (profile: TestProfileView) => void;
}

export function TestProfileRowActions({
  profile,
  onEdit,
}: TestProfileRowActionsProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const duplicateProfile = useDuplicateTestProfileMutation();
  const deleteProfile = useDeleteTestProfileMutation();
  const testProfileId = profile.id;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        aria-label={`Edit test profile ${profile.id}`}
        onClick={() => onEdit(profile)}
      >
        <PencilIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        aria-label={`Duplicate test profile ${profile.id}`}
        disabled={duplicateProfile.isPending}
        onClick={() => duplicateProfile.mutate({ testProfileId })}
      >
        <CopyIcon />
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="icon-xs"
        aria-label={`Delete test profile ${profile.id}`}
        onClick={() => setDeleteOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteProfile.isPending}
        onConfirm={() =>
          deleteProfile.mutate(
            { testProfileId },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setDeleteOpen(false);
              },
            },
          )
        }
      />
    </div>
  );
}
