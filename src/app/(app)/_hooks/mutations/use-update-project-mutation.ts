'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import { updateProjectAction } from '@/server/projects/actions';
import type { UpdateProjectInput } from '@/server/projects/types';

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ShellService.updateProjectMutationKey,
    mutationFn: (input: UpdateProjectInput) => updateProjectAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ShellService.getProjectQuery({
            projectId: result.data.id,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: ShellService.getProjectsQuery({
            organizationId: result.data.organizationId,
          }).queryKey,
        }),
      ]);
    },
  });
};
