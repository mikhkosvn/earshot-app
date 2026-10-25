'use client';

import { useMutation } from '@tanstack/react-query';

import { useOpenProject } from '@/app/(app)/_hooks/use-open-project';
import { ShellService } from '@/app/(app)/_service';
import { switchOrganizationAction } from '@/server/organizations/actions';
import type { OrganizationIdInput } from '@/server/organizations/types';

export const useSwitchOrganizationMutation = () => {
  const openProject = useOpenProject();

  return useMutation({
    mutationKey: ShellService.switchOrganizationMutationKey,
    mutationFn: (input: OrganizationIdInput) => switchOrganizationAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      openProject(result.data.projectId);
    },
  });
};
