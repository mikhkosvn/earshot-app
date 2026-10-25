'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { MonitorService } from '../_service';

export const useMonitorAgents = () => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(
    MonitorService.getAgentOptionsQuery({ projectId }),
  );
  return data;
};
