'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { KnowledgeConnectorType } from '@/generated/prisma/enums';
import { KnowledgeConnectorTypeLabel } from '@/server/agents/constants/knowledge-connector-type-labels';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';

import { RequiredMark } from '../../../../_components/basics/required-mark';
import { numberInputValue } from '../../../../_utils/number-input-value';

const TYPE_ITEMS = Object.values(KnowledgeConnectorType).map((type) => ({
  value: type,
  label: KnowledgeConnectorTypeLabel[type],
}));

export function ConnectorBasicsFields() {
  const { control } = useFormContext<KnowledgeConnectorFormValues>();

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="connector-name" className="gap-0">
              Connector Name <RequiredMark required />
            </FieldLabel>
            <Input
              {...field}
              id="connector-name"
              placeholder="e.g., Production Database"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="syncEnabled"
          control={control}
          render={({ field }) => (
            <Field className="gap-1.5">
              <FieldLabel htmlFor="connector-sync">Enable Sync</FieldLabel>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Switch
                  id="connector-sync"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                Auto-sync data
              </div>
            </Field>
          )}
        />
        <Controller
          name="syncIntervalDays"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="connector-interval">
                Sync Interval (days)
              </FieldLabel>
              <Input
                id="connector-interval"
                type="number"
                min={1}
                value={numberInputValue(field.value)}
                aria-invalid={fieldState.invalid}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel htmlFor="connector-type" className="gap-0">
              Connector Type <RequiredMark required />
            </FieldLabel>
            <Select
              items={TYPE_ITEMS}
              value={field.value}
              onValueChange={(value) => {
                if (value === null) return;
                field.onChange(value);
              }}
            >
              <SelectTrigger id="connector-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPE_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </>
  );
}
