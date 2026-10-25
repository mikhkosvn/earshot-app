'use client';

import { PlusIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { EnumKeyRow } from './enum-key-row';

export function EnumKeyList() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="enumValues"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          {field.value.map((value, index) => (
            <EnumKeyRow
              key={index}
              index={index}
              value={value}
              error={fieldState.error}
              disabled={field.disabled}
              onValueChange={(next) =>
                field.onChange(
                  field.value.map((item, position) => {
                    if (position !== index) return item;
                    return next;
                  }),
                )
              }
              onRemove={() =>
                field.onChange(
                  field.value.filter((_, position) => position !== index),
                )
              }
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            disabled={field.disabled}
            onClick={() => field.onChange([...field.value, ''])}
          >
            <PlusIcon />
            Add
          </Button>
        </div>
      )}
    />
  );
}
