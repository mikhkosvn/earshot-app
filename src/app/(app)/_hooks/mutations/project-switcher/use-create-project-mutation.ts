'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useOpenProject } from '@/app/(app)/_hooks/use-open-project';
import { ShellService } from '@/app/(app)/_service';
import { createProjectAction } from '@/server/projects/actions';
import type { CreateProjectInput } from '@/server/projects/types';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  const openProject = useOpenProject();

  return useMutation({
    mutationKey: ShellService.createProjectMutationKey,
    mutationFn: (input: CreateProjectInput) => createProjectAction(input),
    onSuccess: async (result, input) => {
      if (!result.ok) return;
      await queryClient.invalidateQueries({
        queryKey: ShellService.getProjectsQuery({
          organizationId: input.organizationId,
        }).queryKey,
      });
      openProject(result.data.id);
    },
  });
};
