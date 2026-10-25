'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { startMetricGenerationSchema } from '@/server/metrics/schemas';
import type { StartMetricGenerationInput } from '@/server/metrics/types';

import { MetricService } from '../../_service';
import { useStartMetricGenerationMutation } from '../mutations/create/use-start-metric-generation-mutation';

export const useGenerateMetricsForm = (onStarted: () => void) => {
  const projectId = useCurrentProjectId();
  const { data: agents } = useSuspenseQuery(
    MetricService.getAgentOptionsQuery({ projectId }),
  );
  const form = useForm<StartMetricGenerationInput>({
    resolver: zodResolver(startMetricGenerationSchema),
    defaultValues: { projectId, agentId: agents.at(0)?.id },
  });
  const startGeneration = useStartMetricGenerationMutation();

  const onSubmit = form.handleSubmit((values) =>
    startGeneration.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onStarted();
      },
    }),
  );

  return { form, onSubmit };
};
