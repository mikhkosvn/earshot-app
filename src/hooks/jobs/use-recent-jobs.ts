'use client';

import { useQuery } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';
import type { JobView } from '@/server/jobs/types';

import { useJobsProjectId } from './use-jobs-project-id';

const NO_JOBS: JobView[] = [];

export const useRecentJobs = () => {
  const projectId = useJobsProjectId();
  const { data } = useQuery({
    ...JobService.getRecentJobsQuery({ projectId: projectId ?? 0 }),
    enabled: projectId !== undefined,
  });
  return data ?? NO_JOBS;
};
