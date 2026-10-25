'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { useCreateFolderForm } from '../../../_hooks/folders/use-create-folder-form';
import { FolderNameField } from './folder-name-field';
import { FolderNameSubmitButton } from './folder-name-submit-button';

interface CreateFolderFormProps {
  parentPath: string | null;
  onCreated: () => void;
}

export function CreateFolderForm({
  parentPath,
  onCreated,
}: CreateFolderFormProps) {
  const { form, onSubmit, isPending } = useCreateFolderForm(
    parentPath,
    onCreated,
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <FolderNameField id="create-folder-name" />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <FolderNameSubmitButton label="Create" isPending={isPending} />
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
