'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { LabRowView } from '@/server/labs/types';

import { useNotesForm } from '../../../_hooks/form/use-notes-form';

type NotesFormProps = {
  row: LabRowView;
  onSaved: () => void;
};

export function NotesForm({ row, onSaved }: NotesFormProps) {
  const { form, onSubmit, isSaving } = useNotesForm(row, onSaved);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="p-3">
        <Controller
          name="feedback"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                aria-label="Notes"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your notes here..."
                className="min-h-28"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
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
  );
}
