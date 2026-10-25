'use client';

import { useQuery } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';

export const useJobProgress = (jobId: string | null | undefined) =>
  useQuery({
    ...JobService.getJobQuery({ jobId: jobId ?? '' }),
    enabled: Boolean(jobId),
  });
