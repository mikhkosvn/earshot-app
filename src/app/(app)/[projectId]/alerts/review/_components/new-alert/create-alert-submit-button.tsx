'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { CreateAlertInput } from '@/server/alerts/types';

import { useIsCreatingAlert } from '../../_hooks/mutations/use-is-creating-alert';
import { CreateAlertSubmitLabel } from './create-alert-submit-label';

export function CreateAlertSubmitButton() {
  const isCreating = useIsCreatingAlert();
  const metricId = useWatch<CreateAlertInput, 'metricId'>({ name: 'metricId' });

  return (
    <Button type="submit" size="sm" disabled={isCreating || metricId <= 0}>
      <CreateAlertSubmitLabel />
    </Button>
  );
}
