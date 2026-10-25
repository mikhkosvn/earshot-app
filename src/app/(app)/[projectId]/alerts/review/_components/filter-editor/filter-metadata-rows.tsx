'use client';

import { PlusIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { ALERT_FILTER_ROWS_MAX } from '@/server/alerts/constants/alert-limits';
import type { AlertFilters } from '@/server/alerts/types';

import { FilterMetadataRow } from './filter-metadata-row';

export function FilterMetadataRows() {
  const { control } = useFormContext<AlertFilters>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata',
  });

  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1 text-xs font-medium">Metadata</legend>
      <p className="text-[11px] text-muted-foreground">
        The call metadata value must equal the value here.
      </p>
      {fields.map((field, index) => (
        <FilterMetadataRow
          key={field.id}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit text-xs"
        disabled={fields.length >= ALERT_FILTER_ROWS_MAX}
        onClick={() => append({ key: '', value: '' })}
      >
        <PlusIcon />
        Add metadata filter
      </Button>
    </fieldset>
  );
}
