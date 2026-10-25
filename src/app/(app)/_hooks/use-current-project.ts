'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

import { useCurrentProjectId } from './use-current-project-id';

export const useCurrentProject = () => {
  const projectId = useCurrentProjectId();
  const { data: project } = useSuspenseQuery(
    ShellService.getProjectQuery({ projectId }),
  );
  return project;
};
