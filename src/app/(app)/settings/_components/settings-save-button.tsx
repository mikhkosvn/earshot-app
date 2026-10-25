'use client';

import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { SettingsSaveLabel } from './settings-save-label';

interface SettingsSaveButtonProps {
  isSaving: boolean;
}

export function SettingsSaveButton({ isSaving }: SettingsSaveButtonProps) {
  const { isDirty } = useFormState();

  return (
    <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
      <SettingsSaveLabel isSaving={isSaving} />
    </Button>
  );
}
