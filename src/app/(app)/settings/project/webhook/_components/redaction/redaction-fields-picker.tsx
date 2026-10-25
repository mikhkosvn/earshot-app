'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FieldError, FieldLabel } from '@/components/ui/field';
import { RedactionField } from '@/generated/prisma/enums';
import { RedactionFieldLabel } from '@/server/agents/constants/redaction-field-labels';

import type { WebhookFormValues } from '../../_schemas/webhook-form-schema';
import { toggleListValue } from '../../_utils/webhook-form-values';

const REDACTION_FIELDS = Object.values(RedactionField);

export function RedactionFieldsPicker() {
  const { control } = useFormContext<WebhookFormValues>();
  const isEnabled = useWatch<WebhookFormValues, 'redactSensitiveData'>({
    name: 'redactSensitiveData',
  });
  if (!isEnabled) return null;

  return (
    <Controller
      name="redactionFields"
      control={control}
      render={({ field, fieldState }) => (
        <fieldset className="flex flex-col gap-2 rounded-md border p-3">
          <legend className="px-1 text-xs font-medium">
            Details to redact
          </legend>
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
            {REDACTION_FIELDS.map((value) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`redact-${value}`}
                  checked={field.value.includes(value)}
                  onCheckedChange={(checked) =>
                    field.onChange(toggleListValue(field.value, value, checked))
                  }
                />
                <FieldLabel
                  htmlFor={`redact-${value}`}
                  className="text-xs font-normal"
                >
                  {RedactionFieldLabel[value]}
                </FieldLabel>
              </div>
            ))}
          </div>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </fieldset>
      )}
    />
  );
}
