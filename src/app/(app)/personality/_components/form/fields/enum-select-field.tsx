'use client';

import { Controller, type Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { selectValue } from '../../../_utils/select-value';
import { RequiredStar } from './required-star';

type SelectItemData = {
  value: string;
  label: string;
};

type EnumSelectFieldProps = {
  name: Path<PersonalityFormValues>;
  label: string;
  items: SelectItemData[];
  required: boolean;
  placeholder: string;
};

export function EnumSelectField({
  name,
  label,
  items,
  required,
  placeholder,
}: EnumSelectFieldProps) {
  const { control } = useFormContext<PersonalityFormValues>();
  const id = `personality-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id} className="gap-0">
            {label}
            <RequiredStar required={required} />
          </FieldLabel>
          <Select
            items={items}
            value={selectValue(field.value)}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger
              id={id}
              aria-invalid={fieldState.invalid}
              className="w-full"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
