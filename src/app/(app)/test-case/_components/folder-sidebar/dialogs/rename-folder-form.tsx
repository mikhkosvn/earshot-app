'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import type { FolderView } from '@/server/folders/types';

import { useRenameFolderForm } from '../../../_hooks/folders/use-rename-folder-form';
import { FolderNameField } from './folder-name-field';
import { FolderNameSubmitButton } from './folder-name-submit-button';

interface RenameFolderFormProps {
  folder: FolderView;
  onRenamed: () => void;
}

export function RenameFolderForm({ folder, onRenamed }: RenameFolderFormProps) {
  const { form, onSubmit, isPending } = useRenameFolderForm(folder, onRenamed);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <FolderNameField id="rename-folder-name" />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <FolderNameSubmitButton label="Rename" isPending={isPending} />
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
