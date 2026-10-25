'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { useOpenProject } from '@/app/(app)/_hooks/use-open-project';
import { ShellService } from '@/app/(app)/_service';
import { deleteProjectAction } from '@/server/projects/actions';
import type { ProjectIdInput } from '@/server/projects/types';

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  const project = useCurrentProject();
  const openProject = useOpenProject();

  return useMutation({
    mutationKey: ShellService.deleteProjectMutationKey,
    mutationFn: (input: ProjectIdInput) => deleteProjectAction(input),
    onSuccess: async (result) => {
      if (!result.ok) return;
      openProject(result.data.nextProjectId);
      await queryClient.invalidateQueries({
        queryKey: ShellService.getProjectsQuery({
          organizationId: project.organizationId,
        }).queryKey,
      });
    },
  });
};
