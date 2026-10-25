'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { runSettingsSchema } from '@/server/runs/schemas';
import type { RunSettingsValues } from '@/server/runs/types';

import { RunDialogService } from '../_service';
import {
  agentMockToolIds,
  agentPhoneNumber,
} from '../_utils/agent-run-defaults';
import { useStartRunMutation } from './mutations/use-start-run-mutation';

export type RunSettingsOutput = z.output<typeof runSettingsSchema>;

export type RunSettingsForm = UseFormReturn<
  RunSettingsValues,
  unknown,
  RunSettingsOutput
>;

interface UseConfigureRunFormArgs {
  evaluatorIds: number[];
  onStarted: (resultId: number) => void;
}

export const useConfigureRunForm = ({
  evaluatorIds,
  onStarted,
}: UseConfigureRunFormArgs) => {
  const projectId = useCurrentProjectId();
  const { data: defaults } = useSuspenseQuery(
    RunDialogService.getDefaultsQuery({ projectId, evaluatorIds }),
  );
  const { data: agent } = useSuspenseQuery(
    RunDialogService.getAgentConfigurationQuery({
      projectId,
      agentId: defaults.agentId,
      evaluatorIds,
    }),
  );
  const form = useForm<RunSettingsValues, unknown, RunSettingsOutput>({
    resolver: zodResolver(runSettingsSchema),
    defaultValues: {
      agentId: defaults.agentId ?? undefined,
      name: '',
      frequency: 1,
      agentNumber: agentPhoneNumber(agent),
      mockToolIds: agentMockToolIds(agent),
      randomize: false,
      personalityIds: [],
      testProfileIds: [],
      concurrencyLimit: defaults.maxConcurrentRuns,
      callsPerSecond: null,
    },
  });
  const startRun = useStartRunMutation();

  const onSubmit = form.handleSubmit((values) =>
    startRun.mutate(
      { ...values, projectId, evaluatorIds },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onStarted(result.data.resultId);
        },
      },
    ),
  );

  return { form, onSubmit };
};
