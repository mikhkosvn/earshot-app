'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { CreateMetricService } from '../_service';

export const useScenarioOptions = () => {
  const projectId = useCurrentProjectId();
  const { data: scenarios } = useSuspenseQuery(
    CreateMetricService.getScenarioOptionsQuery({ projectId }),
  );
  return scenarios;
};
