'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { SettingFieldDescription } from '@/app/(app)/settings/_components/fields/setting-field-description';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import type { NotificationSettings } from '@/server/notification-settings/types';

import { useIsEmailEnabled } from '../_hooks/use-is-email-enabled';

type NotificationSwitchFieldProps = {
  name: Exclude<keyof NotificationSettings, 'emailNotificationsEnabled'>;
  label: string;
  description: string;
};

export function NotificationSwitchField({
  name,
  label,
  description,
}: NotificationSwitchFieldProps) {
  const { control } = useFormContext<NotificationSettings>();
  const isEmailEnabled = useIsEmailEnabled();
  const id = `notification-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field
          orientation="horizontal"
          data-disabled={!isEmailEnabled}
          className="items-center gap-4"
        >
          <FieldContent>
            <FieldLabel htmlFor={id} className="text-xs">
              {label}
            </FieldLabel>
            <SettingFieldDescription description={description} />
          </FieldContent>
          <Switch
            id={id}
            name={field.name}
            checked={field.value}
            disabled={!isEmailEnabled}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  );
}
