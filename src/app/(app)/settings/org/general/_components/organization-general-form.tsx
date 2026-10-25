'use client';

import { FormProvider } from 'react-hook-form';

import { SettingNumberField } from '@/app/(app)/settings/_components/fields/setting-number-field';
import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';
import { SettingTextField } from '@/app/(app)/settings/_components/fields/setting-text-field';
import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';
import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveButton } from '@/app/(app)/settings/_components/settings-save-button';

import { useIsUpdatingOrganizationSettings } from '../../_hooks/use-is-updating-organization-settings';
import {
  useOrganizationGeneralForm,
  type OrganizationGeneralFormValues,
} from '../_hooks/use-organization-general-form';
import { TeamSizeField } from './team-size-field';

export function OrganizationGeneralForm() {
  const { form, onSubmit } = useOrganizationGeneralForm();
  const isSaving = useIsUpdatingOrganizationSettings();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="Organization Settings"
          description="Manage your organization details and preferences"
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <SettingsCard>
          <SettingTextField<OrganizationGeneralFormValues>
            name="name"
            label="Organization Name"
            autoComplete="organization"
          />
          <TeamSizeField />
        </SettingsCard>
        <SettingsCard>
          <SettingNumberField<OrganizationGeneralFormValues>
            name="maxConcurrentRuns"
            label="Parallel Call Limit"
            description="Specifies the maximum number of simultaneous calls the system can handle"
          />
        </SettingsCard>
        <SettingsCard>
          <SettingSwitchField<OrganizationGeneralFormValues>
            name="allowDuplicateCallIds"
            label="Allow Duplicate Call IDs"
            description="Enabling this allows uploading calls with same call id in observability"
          />
        </SettingsCard>
      </form>
    </FormProvider>
  );
}
