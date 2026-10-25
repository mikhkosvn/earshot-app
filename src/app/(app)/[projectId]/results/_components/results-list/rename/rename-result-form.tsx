'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import type { ResultListRow } from '@/server/results/types';

import { useRenameResultForm } from '../../../_hooks/results-list/use-rename-result-form';
import { RenameResultNameField } from './rename-result-name-field';
import { RenameResultSubmitButton } from './rename-result-submit-button';

type RenameResultFormProps = {
  result: ResultListRow;
  onRenamed: () => void;
};

export function RenameResultForm({ result, onRenamed }: RenameResultFormProps) {
  const { form, onSubmit } = useRenameResultForm(result, onRenamed);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <RenameResultNameField />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <RenameResultSubmitButton />
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
