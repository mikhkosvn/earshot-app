'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { KnowledgeService } from '../_service';

export const useKnowledgeVersions = () => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(
    KnowledgeService.getVersionsQuery({ projectId }),
  );
  return data;
};
