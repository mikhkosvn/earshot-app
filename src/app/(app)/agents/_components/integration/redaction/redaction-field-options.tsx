'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RedactionField } from '@/generated/prisma/enums';
import { RedactionFieldLabel } from '@/server/agents/constants/redaction-field-labels';
import type { AgentConfigValues } from '@/server/agents/types';

const toggleField = (
  fields: readonly RedactionField[],
  field: RedactionField,
  checked: boolean,
) => {
  if (checked) return [...fields, field];
  return fields.filter((item) => item !== field);
};

export function RedactionFieldOptions() {
  const { control } = useFormContext<AgentConfigValues>();
  const enabled = useWatch({ control, name: 'redactionEnabled' });
  if (!enabled) return null;

  return (
    <Controller
      name="redactionFields"
      control={control}
      render={({ field }) => (
        <div className="grid grid-cols-2 gap-2 rounded-lg border p-2.5">
          {Object.values(RedactionField).map((item) => (
            <Label key={item} className="gap-2 text-xs font-normal">
              <Checkbox
                checked={field.value.includes(item)}
                onCheckedChange={(checked) =>
                  field.onChange(toggleField(field.value, item, checked))
                }
              />
              {RedactionFieldLabel[item]}
            </Label>
          ))}
        </div>
      )}
    />
  );
}
