'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentConfigValues } from '@/server/agents/types';

import { LANGUAGE_ITEMS } from '../../_constants/language-items';
import { RequiredMark } from './required-mark';

const FIELD_ID = 'agent-language';

export function AgentLanguageField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <Controller
      name="language"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="gap-0 text-xs">
              Language
              <RequiredMark required />
            </FieldLabel>
            <FieldDescription className="text-xs">
              Main language for agent communication
            </FieldDescription>
          </div>
          <Select
            items={LANGUAGE_ITEMS}
            value={field.value}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger
              id={FIELD_ID}
              className="w-full bg-background text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_ITEMS.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="text-xs"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
