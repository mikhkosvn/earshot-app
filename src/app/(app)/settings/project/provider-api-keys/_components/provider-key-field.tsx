'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { SecretInput } from '@/app/(app)/settings/_components/fields/secret-input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import type { ProviderKeyProvider } from '@/generated/prisma/enums';
import type { ProviderApiKeysFormValues } from '@/server/provider-api-keys/types';

import { ProviderKeyFieldLabel } from '../_constants/provider-key-field-labels';
import { useProviderKeyState } from '../_hooks/use-provider-key-state';
import { DeleteProviderKeyButton } from './delete-provider-key-button';
import { ProviderKeySavedBadge } from './provider-key-saved-badge';

type ProviderKeyFieldProps = {
  provider: ProviderKeyProvider;
};

export function ProviderKeyField({ provider }: ProviderKeyFieldProps) {
  const { control } = useFormContext<ProviderApiKeysFormValues>();
  const state = useProviderKeyState(provider);
  const label = ProviderKeyFieldLabel[provider];
  const id = `provider-key-${provider}`;

  return (
    <Controller
      name={`keys.${provider}`}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor={id} className="text-xs">
              {label}
            </FieldLabel>
            <ProviderKeySavedBadge maskedKey={state?.maskedKey ?? null} />
          </div>
          <div className="flex items-center gap-2">
            <SecretInput
              {...field}
              id={id}
              placeholder={state?.maskedKey ?? ''}
              aria-invalid={fieldState.invalid}
            />
            <DeleteProviderKeyButton
              provider={provider}
              label={label}
              isConfigured={Boolean(state?.maskedKey)}
            />
          </div>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
