'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { OptimizerScheduleService } from '../../_service';

export const useOptimizerSchedules = () => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(
    OptimizerScheduleService.getListQuery({ projectId }),
  );
  return data;
};
