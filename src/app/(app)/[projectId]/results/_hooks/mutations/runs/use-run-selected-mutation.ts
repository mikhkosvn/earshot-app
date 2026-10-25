'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import {
  getRunAgentConfigurationAction,
  getRunDefaultsAction,
  startRunAction,
} from '@/server/runs/actions';

import { ResultService } from '../../../_service';
import { runSelectedInput } from '../../../_utils/runs/run-selected-input';

type RunSelectedVariables = {
  agentId: number | null;
  evaluatorIds: number[];
};

const loadAgent = (args: {
  projectId: number;
  agentId: number;
  evaluatorIds: number[];
}) => {
  if (args.agentId <= 0) return Promise.resolve(null);
  return getRunAgentConfigurationAction(args);
};

export const useRunSelectedMutation = () => {
  const projectId = useCurrentProjectId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.runSelectedMutationKey,
    mutationFn: async ({ agentId, evaluatorIds }: RunSelectedVariables) => {
      const defaults = await getRunDefaultsAction({ projectId, evaluatorIds });
      const runAgentId = agentId ?? defaults.agentId ?? 0;
      const agent = await loadAgent({
        projectId,
        agentId: runAgentId,
        evaluatorIds,
      });
      return startRunAction(
        runSelectedInput({
          projectId,
          agentId: runAgentId,
          evaluatorIds,
          defaults,
          agent,
        }),
      );
    },
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The run is started.');
      return queryClient.invalidateQueries({ queryKey: ResultService.listKey });
    },
  });
};
