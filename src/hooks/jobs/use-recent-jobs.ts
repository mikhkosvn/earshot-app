'use client';

import { useQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { JobService } from '@/components/common/background-tasks/_service';
import type { JobView } from '@/server/jobs/types';

const NO_JOBS: JobView[] = [];

export const useRecentJobs = () => {
  const projectId = useCurrentProjectId();
  const { data } = useQuery(JobService.getRecentJobsQuery({ projectId }));
  return data ?? NO_JOBS;
};
