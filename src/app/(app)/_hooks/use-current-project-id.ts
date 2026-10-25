'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

import { useUrlProjectId } from './use-url-project-id';

export const useCurrentProjectId = () => {
  const urlProjectId = useUrlProjectId();
  const { data: fallbackProjectId } = useSuspenseQuery(
    ShellService.getCurrentProjectIdQuery(),
  );
  return urlProjectId ?? fallbackProjectId;
};
