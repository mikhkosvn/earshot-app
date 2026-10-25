'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { RunDialogService } from '../_service';
import type { RunSettingsForm } from './use-configure-run-form';

export const useSelectedRunAgent = (
  control: RunSettingsForm['control'],
  evaluatorIds: number[],
) => {
  const projectId = useCurrentProjectId();
  const agentId = useWatch({ control, name: 'agentId' });
  const { data } = useSuspenseQuery(
    RunDialogService.getAgentConfigurationQuery({
      projectId,
      agentId: agentId ?? null,
      evaluatorIds,
    }),
  );
  return data;
};
