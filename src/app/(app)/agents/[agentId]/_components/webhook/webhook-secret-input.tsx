'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import type { AgentSettingsValues } from '@/server/agents/types';

import { PasswordInput } from '../../../_components/integration/secret/password-input';
import { WEBHOOK_SECRET_HELP } from '../../_constants/webhook';

const FIELD_ID = 'agent-webhook-secret';

export function WebhookSecretInput() {
  const { control } = useFormContext<AgentSettingsValues>();

  return (
    <Controller
      name="webhookSecret"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Webhook Secret
          </FieldLabel>
          <PasswordInput
            id={FIELD_ID}
            name={field.name}
            value={field.value}
            placeholder="my-secret"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
          <FieldDescription className="text-xs">
            {WEBHOOK_SECRET_HELP}
          </FieldDescription>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
