import { z } from 'zod';

import type { JobView } from '@/server/jobs/types';

const reviewJobInputSchema = z.object({
  reviewId: z.number(),
  metricName: z.string().optional(),
});

export const reviewJobInput = (job: JobView) =>
  reviewJobInputSchema.safeParse(job.input).data;
