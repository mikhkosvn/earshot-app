'use client';

import { useQueryClient } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { RunSettingsForm } from './use-configure-run-form';

import { RunDialogService } from '../_service';
import {
  agentMockToolIds,
  agentPhoneNumber,
} from '../_utils/agent-run-defaults';

export const useRunAgentChange = (
  form: RunSettingsForm,
  evaluatorIds: number[],
) => {
  const projectId = useCurrentProjectId();
  const queryClient = useQueryClient();

  return async (agentId: number) => {
    form.setValue('agentId', agentId, { shouldValidate: true });
    form.setValue('testProfileIds', []);
    const agent = await queryClient.fetchQuery(
      RunDialogService.getAgentConfigurationQuery({
        projectId,
        agentId,
        evaluatorIds,
      }),
    );
    form.setValue('agentNumber', agentPhoneNumber(agent));
    form.setValue('mockToolIds', agentMockToolIds(agent));
  };
};
