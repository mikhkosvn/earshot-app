'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { MetricService } from '@/app/(app)/metrics/_service';

export const useAgentOptions = () => {
  const projectId = useCurrentProjectId();
  const { data: agents } = useSuspenseQuery(
    MetricService.getAgentOptionsQuery({ projectId }),
  );
  return agents;
};
