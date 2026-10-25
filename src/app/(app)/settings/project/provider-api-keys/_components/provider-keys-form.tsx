'use client';

import { FormProvider } from 'react-hook-form';

import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';
import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveLabel } from '@/app/(app)/settings/_components/settings-save-label';
import { Button } from '@/components/ui/button';

import { PROVIDER_KEY_PROVIDERS } from '../_constants/provider-key-field-labels';
import { useIsSavingProviderApiKeys } from '../_hooks/use-is-saving-provider-api-keys';
import { useProviderApiKeysForm } from '../_hooks/use-provider-api-keys-form';
import { ProviderKeyField } from './provider-key-field';

export function ProviderKeysForm() {
  const { form, onSubmit } = useProviderApiKeysForm();
  const isSaving = useIsSavingProviderApiKeys();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="API Settings"
          description="Configure API keys for your project"
        >
          <Button type="submit" size="sm" disabled={isSaving}>
            <SettingsSaveLabel isSaving={isSaving} />
          </Button>
        </SettingsHeaderCard>
        <SettingsCard className="gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Provider API Keys</h2>
            <p className="text-xs text-muted-foreground">
              Keys are write-only. Type a key to save or replace it. Empty boxes
              keep the saved key.
            </p>
          </div>
          {PROVIDER_KEY_PROVIDERS.map((provider) => (
            <ProviderKeyField key={provider} provider={provider} />
          ))}
        </SettingsCard>
      </form>
    </FormProvider>
  );
}
