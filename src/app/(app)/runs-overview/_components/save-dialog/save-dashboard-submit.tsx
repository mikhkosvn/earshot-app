'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { SaveConfigurationFormValues } from '../../_schemas/save-configuration-form-schema';

type SaveDashboardSubmitProps = {
  isPending: boolean;
};

export function SaveDashboardSubmit({ isPending }: SaveDashboardSubmitProps) {
  const name = useWatch<SaveConfigurationFormValues, 'name'>({ name: 'name' });

  return (
    <Button type="submit" size="sm" disabled={isPending || !name.trim()}>
      Save
    </Button>
  );
}
