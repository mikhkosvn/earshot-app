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
import {
  ALL_FAILURES_VALUE,
  FAILURE_LIMIT_OPTIONS,
} from '@/server/insights/constants/insight-limits';
import type { SaveInsightConfigInput } from '@/server/insights/types';

import { FailureLimitHint } from './failure-limit-hint';

const FIELD_ID = 'insight-failure-limit';

const items = [
  { value: ALL_FAILURES_VALUE, label: 'All failures' },
  ...FAILURE_LIMIT_OPTIONS.map((limit) => ({
    value: String(limit),
    label: `${limit} failures`,
  })),
];

const selectValueOf = (limit: number | null) => {
  if (limit === null) return ALL_FAILURES_VALUE;
  return String(limit);
};

const limitOf = (value: string) => {
  if (value === ALL_FAILURES_VALUE) return null;
  return Number(value);
};

export function FailureLimitField() {
  const { control } = useFormContext<SaveInsightConfigInput>();

  return (
    <Controller
      name="triageFailureLimit"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Failures to consider each day
          </FieldLabel>
          <Select
            items={items}
            value={selectValueOf(field.value)}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(limitOf(value));
            }}
          >
            <SelectTrigger
              id={FIELD_ID}
              aria-label="Failures to consider each day"
              className="w-full text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
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
          <FailureLimitHint limit={field.value} />
        </Field>
      )}
    />
  );
}
