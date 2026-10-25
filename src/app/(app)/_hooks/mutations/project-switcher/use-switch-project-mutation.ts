'use client';

import { useMutation } from '@tanstack/react-query';

import { useOpenProject } from '@/app/(app)/_hooks/use-open-project';
import { ShellService } from '@/app/(app)/_service';
import { switchProjectAction } from '@/server/projects/actions';
import type { ProjectIdInput } from '@/server/projects/types';

export const useSwitchProjectMutation = () => {
  const openProject = useOpenProject();

  return useMutation({
    mutationKey: ShellService.switchProjectMutationKey,
    mutationFn: (input: ProjectIdInput) => switchProjectAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      openProject(result.data.projectId);
    },
  });
};
