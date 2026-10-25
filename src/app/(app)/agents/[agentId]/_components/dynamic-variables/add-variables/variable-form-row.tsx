'use client';

import { Trash2Icon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { AddVariablesFormValues } from '../../../_schemas/add-variables-form-schema';

interface VariableFormRowProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export function VariableFormRow({
  index,
  canRemove,
  onRemove,
}: VariableFormRowProps) {
  const { control } = useFormContext<AddVariablesFormValues>();

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
      <div className="flex items-start gap-2">
        <Controller
          name={`variables.${index}.name`}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1 gap-1">
              <Input
                {...field}
                placeholder="Variable name, e.g. firstName"
                aria-label="Variable name, e.g. firstName"
                aria-invalid={fieldState.invalid}
                className="bg-background"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Remove variable"
          disabled={!canRemove}
          onClick={onRemove}
        >
          <Trash2Icon />
        </Button>
      </div>
      <Controller
        name={`variables.${index}.description`}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <Textarea
              {...field}
              placeholder="Description — what value this variable holds and its expected format"
              aria-label="Description — what value this variable holds and its expected format"
              aria-invalid={fieldState.invalid}
              className="bg-background"
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </div>
  );
}
