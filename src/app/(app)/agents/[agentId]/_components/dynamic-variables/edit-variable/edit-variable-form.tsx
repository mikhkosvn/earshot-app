'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { DynamicVariableItem } from '@/server/agents/types';

import { PendingLabel } from '../../../../_components/pending-label';
import { useEditVariableForm } from '../../../_hooks/use-edit-variable-form';

type EditVariableFormProps = {
  variable: DynamicVariableItem;
  onSaved: () => void;
};

export function EditVariableForm({ variable, onSaved }: EditVariableFormProps) {
  const { form, onSubmit, isPending } = useEditVariableForm(variable, onSaved);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.stopPropagation();
        void onSubmit(event);
      }}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="variable-name">Name</FieldLabel>
            <Input
              {...field}
              id="variable-name"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="variable-description">Description</FieldLabel>
            <Textarea
              {...field}
              id="variable-description"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          <PendingLabel pending={isPending} pendingText="Saving...">
            Save Variable
          </PendingLabel>
        </Button>
      </DialogFooter>
    </form>
  );
}
