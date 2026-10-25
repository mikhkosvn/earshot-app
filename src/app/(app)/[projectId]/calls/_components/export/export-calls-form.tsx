'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useExportCallsForm } from '../../_hooks/forms/use-export-calls-form';

interface ExportCallsFormProps {
  onStarted: () => void;
}

const FIELD_ID = 'export-row-count';

const inputValue = (value: number) => {
  if (Number.isNaN(value)) return '';
  return value;
};

export function ExportCallsForm({ onStarted }: ExportCallsFormProps) {
  const { form, onSubmit, isPending } = useExportCallsForm(onStarted);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Controller
        name="numRecords"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Number of rows to export (max 10,000)
            </FieldLabel>
            <Input
              id={FIELD_ID}
              type="number"
              min={1}
              max={10000}
              value={inputValue(field.value)}
              className="text-xs md:text-xs"
              onChange={(event) => field.onChange(event.target.valueAsNumber)}
            />
            <FieldError errors={[fieldState.error]} className="text-xs" />
          </Field>
        )}
      />
      <div className="flex justify-end gap-2">
        <DialogClose
          render={<Button type="button" variant="outline" size="sm" />}
        >
          Cancel
        </DialogClose>
        <Button type="submit" size="sm" disabled={isPending}>
          Start Export
        </Button>
      </div>
    </form>
  );
}
