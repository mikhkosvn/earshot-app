'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { API_KEY_LEVEL_ITEMS } from '../../_constants/api-key-level-items';
import type { CreateApiKeyFormValues } from '../../_schemas/create-api-key-form-schema';
import { ApiKeyLevelHint } from './api-key-level-hint';

const FIELD_ID = 'create-api-key-level';

export function ApiKeyLevelField() {
  const { control } = useFormContext<CreateApiKeyFormValues>();

  return (
    <Controller
      name="level"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID}>API Key Level</FieldLabel>
          <Select
            items={API_KEY_LEVEL_ITEMS}
            value={field.value}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {API_KEY_LEVEL_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ApiKeyLevelHint />
        </Field>
      )}
    />
  );
}
