'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useAddCallForm } from '../../_hooks/forms/use-add-call-form';
import { AddCallSubmitButton } from './add-call-submit-button';
import { CallAgentField } from './call-agent-field';
import { RecordingFilesField } from './recording-files/recording-files-field';

interface AddCallFormProps {
  onCreated: () => void;
}

export function AddCallForm({ onCreated }: AddCallFormProps) {
  const { form, onSubmit } = useAddCallForm(onCreated);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <CallAgentField />
        <RecordingFilesField />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <AddCallSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
