'use client';

import { XIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AlertFilters } from '@/server/alerts/types';

interface FilterMetadataRowProps {
  index: number;
  onRemove: () => void;
}

export function FilterMetadataRow({ index, onRemove }: FilterMetadataRowProps) {
  const { control } = useFormContext<AlertFilters>();

  return (
    <div className="flex items-start gap-1.5">
      <Controller
        name={`metadata.${index}.key`}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <Input
              {...field}
              aria-label="Metadata key"
              placeholder="Metadata key (e.g. caller_id)"
              className="h-7 text-xs md:text-xs"
            />
            <FieldError errors={[fieldState.error]} className="text-[11px]" />
          </Field>
        )}
      />
      <Controller
        name={`metadata.${index}.value`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            aria-label="Metadata value"
            placeholder="Equals value…"
            className="h-7 text-xs md:text-xs"
          />
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Remove metadata filter"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </div>
  );
}
