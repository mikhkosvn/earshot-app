'use client';

import { noop, useQueryClient } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { KnowledgeService } from '../_service';

export const useStartVersionsQuery = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return () => {
    void queryClient
      .query(KnowledgeService.getVersionsQuery({ projectId }))
      .catch(noop);
  };
};
