'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { ACTIVE_JOB_STATUSES } from '@/server/jobs/constants';

export const useActiveGenerationCount = () => {
  const projectId = useCurrentProjectId();
  const { data: count } = useSuspenseQuery({
    ...EvaluatorService.getGenerationJobsQuery({ projectId }),
    select: (jobs) =>
      jobs.filter((job) => ACTIVE_JOB_STATUSES.includes(job.status)).length,
  });
  return count;
};
