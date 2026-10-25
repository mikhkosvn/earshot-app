'use client';

import { useIsMutating } from '@tanstack/react-query';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { CreateSavedViewInput } from '@/server/saved-views/types';

import { MetricService } from '../../_service';

export function CreateViewSubmitButton() {
  const { control } = useFormContext<CreateSavedViewInput>();
  const name = useWatch({ control, name: 'name' });
  const isCreating =
    useIsMutating({ mutationKey: MetricService.createViewMutationKey }) > 0;

  return (
    <Button type="submit" size="sm" disabled={isCreating || name.trim() === ''}>
      Create
    </Button>
  );
}
