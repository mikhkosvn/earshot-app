'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import type { LabRowView } from '@/server/labs/types';

import { useExpectedValueForm } from '../../../_hooks/form/use-expected-value-form';
import { ExpectedValueInput } from './expected-value-input';

interface ExpectedValueFormProps {
  row: LabRowView;
  onSaved: () => void;
}

export function ExpectedValueForm({ row, onSaved }: ExpectedValueFormProps) {
  const { form, onSubmit, isSaving } = useExpectedValueForm(row, onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <div className="p-3">
          <ExpectedValueInput />
        </div>
        <div className="flex justify-end gap-2 border-t p-3">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isSaving}>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
