'use client';

import { useQuery } from '@tanstack/react-query';

import { useUrlProjectId } from '@/app/(app)/_hooks/use-url-project-id';
import { ShellService } from '@/app/(app)/_service';

export const useJobsProjectId = () => {
  const urlProjectId = useUrlProjectId();
  const { data: fallbackProjectId } = useQuery({
    ...ShellService.getCurrentProjectIdQuery(),
    enabled: urlProjectId === null,
  });
  return urlProjectId ?? fallbackProjectId;
};
