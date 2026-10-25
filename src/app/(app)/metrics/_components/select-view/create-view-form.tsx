'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useCreateViewForm } from '../../_hooks/forms/use-create-view-form';
import { CreateViewSubmitButton } from './create-view-submit-button';
import { ViewAgentsField } from './view-agents-field';
import { ViewNameField } from './view-name-field';

type CreateViewFormProps = {
  onCreated: () => void;
};

export function CreateViewForm({ onCreated }: CreateViewFormProps) {
  const { form, onSubmit } = useCreateViewForm(onCreated);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <ViewNameField />
        <ViewAgentsField />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <CreateViewSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
