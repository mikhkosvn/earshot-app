'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { SecretInput } from '@/app/(app)/settings/_components/fields/secret-input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import { useWebhookSettings } from '../_hooks/use-webhook-settings';
import type { WebhookFormValues } from '../_schemas/webhook-form-schema';
import { secretPlaceholder } from '../_utils/secret-placeholder';

const FIELD_ID = 'webhook-secret';

export function WebhookSecretField() {
  const { control } = useFormContext<WebhookFormValues>();
  const { secretConfigured } = useWebhookSettings();

  return (
    <Controller
      name="secret"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Webhook Secret
          </FieldLabel>
          <SecretInput
            {...field}
            id={FIELD_ID}
            placeholder={secretPlaceholder(secretConfigured)}
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription className="text-xs">
            Secret key for webhook authentication. Sent in the X-Earshot-Secret
            header. Each request also carries an HMAC SHA-256 signature of the
            body in the X-Earshot-Signature header.
          </FieldDescription>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
