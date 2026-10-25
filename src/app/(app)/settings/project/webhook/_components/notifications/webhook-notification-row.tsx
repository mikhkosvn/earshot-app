'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { SettingFieldDescription } from '@/app/(app)/settings/_components/fields/setting-field-description';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

import type { WebhookNotificationRowConfig } from '../../_constants/webhook-notification-groups';
import type { WebhookFormValues } from '../../_schemas/webhook-form-schema';
import { toggleListValue } from '../../_utils/webhook-form-values';
import { WebhookTestButton } from './webhook-test-button';

interface WebhookNotificationRowProps {
  row: WebhookNotificationRowConfig;
}

export function WebhookNotificationRow({ row }: WebhookNotificationRowProps) {
  const { control } = useFormContext<WebhookFormValues>();
  const id = `webhook-${row.notification}`;

  return (
    <Controller
      name="notifications"
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-center gap-4">
          <FieldContent>
            <FieldLabel htmlFor={id} className="text-xs">
              {row.label}
            </FieldLabel>
            <SettingFieldDescription description={row.description} />
          </FieldContent>
          <Switch
            id={id}
            checked={field.value.includes(row.notification)}
            onCheckedChange={(checked) =>
              field.onChange(
                toggleListValue(field.value, row.notification, checked),
              )
            }
          />
          <WebhookTestButton notification={row.notification} />
        </Field>
      )}
    />
  );
}
