'use client';

import { FormProvider } from 'react-hook-form';

import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';
import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';
import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveButton } from '@/app/(app)/settings/_components/settings-save-button';

import { useIsUpdatingOrganizationSettings } from '../../_hooks/use-is-updating-organization-settings';
import {
  useByotPolicyForm,
  type ByotPolicyFormValues,
} from '../_hooks/use-byot-policy-form';

export function ByotPolicyForm() {
  const { form, onSubmit } = useByotPolicyForm();
  const isSaving = useIsUpdatingOrganizationSettings();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="Bring your own Telephony"
          description="Control the global policy for external carrier numbers and manage the organization's telephony inventory."
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <SettingsCard>
          <h2 className="text-base font-semibold">Global BYOT Activation</h2>
          <SettingSwitchField<ByotPolicyFormValues>
            name="restrictNumbersToOwnImports"
            label="Restrict Number Selection to Personal Imports"
            description="If ON, users will ONLY see phone numbers they personally imported for inbound/outbound setup."
          />
        </SettingsCard>
      </form>
    </FormProvider>
  );
}
