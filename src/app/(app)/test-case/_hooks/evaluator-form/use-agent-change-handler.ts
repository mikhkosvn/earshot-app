'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { EvaluatorService } from '@/app/(app)/test-case/_service';

export const useAgentChangeHandler = () => {
  const projectId = useCurrentProjectId();
  const queryClient = useQueryClient();
  const { setValue } = useFormContext<EvaluatorFormValues>();

  return async (agentId: number | null) => {
    setValue('agentId', agentId, { shouldDirty: true, shouldValidate: true });
    setValue('expectedToolCalls', [], { shouldDirty: true });
    if (agentId === null) {
      setValue('testProfileId', null, { shouldDirty: true });
      return;
    }
    const defaults = await queryClient.fetchQuery(
      EvaluatorService.getAgentDefaultsQuery({ projectId, agentId }),
    );
    setValue('testProfileId', defaults.defaultTestProfileId, {
      shouldDirty: true,
    });
    setValue('language', defaults.language, { shouldDirty: true });
  };
};
