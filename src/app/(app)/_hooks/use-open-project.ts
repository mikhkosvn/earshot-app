'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { ShellService } from '@/app/(app)/_service';
import { getProjectSwitchUrl } from '@/app/(app)/_utils/project-switch-url';

import { useCurrentProjectId } from './use-current-project-id';

export const useOpenProject = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentProjectId = useCurrentProjectId();
  const queryClient = useQueryClient();

  return (projectId: number) => {
    queryClient.setQueryData(
      ShellService.getCurrentProjectIdQuery().queryKey,
      projectId,
    );
    const target = getProjectSwitchUrl(pathname, currentProjectId, projectId);
    if (!target) return;
    router.push(target);
  };
};
