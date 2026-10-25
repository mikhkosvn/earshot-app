'use client';

import { FormProvider } from 'react-hook-form';

import { useAccountSettingsForm } from '@/app/(app)/settings/_hooks/use-account-settings-form';
import { useIsSavingAccount } from '@/app/(app)/settings/_hooks/use-is-saving-account';
import type { UpdateCurrentUserInput } from '@/server/users/types';

import { SettingTextField } from '../fields/setting-text-field';
import { SettingsHeaderCard } from '../settings-header-card';
import { SettingsSaveButton } from '../settings-save-button';
import { AccountProfileCard } from './account-profile-card';

export function AccountSettingsForm() {
  const { form, onSubmit } = useAccountSettingsForm();
  const isSaving = useIsSavingAccount();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="Account Settings"
          description="Manage your account details and preferences"
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <div className="grid items-start gap-3 md:grid-cols-[2fr_3fr]">
          <AccountProfileCard />
          <section className="flex flex-col gap-4 rounded-lg border bg-background p-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold">Profile</h2>
              <p className="text-xs text-muted-foreground">
                The name and the email of your account
              </p>
            </div>
            <SettingTextField<UpdateCurrentUserInput>
              name="name"
              label="Name"
              autoComplete="name"
            />
            <SettingTextField<UpdateCurrentUserInput>
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
            />
          </section>
        </div>
      </form>
    </FormProvider>
  );
}
