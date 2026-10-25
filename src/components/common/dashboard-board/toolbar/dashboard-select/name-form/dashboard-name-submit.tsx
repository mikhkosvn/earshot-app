'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { DashboardNameFormValues } from '../../../_schemas/dashboard-name-form-schema';

type DashboardNameSubmitProps = {
  label: string;
  isPending: boolean;
};

export function DashboardNameSubmit({
  label,
  isPending,
}: DashboardNameSubmitProps) {
  const name = useWatch<DashboardNameFormValues, 'name'>({ name: 'name' });

  return (
    <Button type="submit" size="sm" disabled={isPending || !name.trim()}>
      {label}
    </Button>
  );
}
