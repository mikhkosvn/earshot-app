'use client';

import { useIsMutating } from '@tanstack/react-query';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { StartMetricGenerationInput } from '@/server/metrics/types';

import { MetricService } from '../../_service';

export function GenerateSubmitButton() {
  const { control } = useFormContext<StartMetricGenerationInput>();
  const agentId = useWatch({ control, name: 'agentId' });
  const isStarting =
    useIsMutating({ mutationKey: MetricService.startGenerationMutationKey }) >
    0;

  return (
    <Button type="submit" disabled={isStarting || !agentId}>
      Generate
    </Button>
  );
}
