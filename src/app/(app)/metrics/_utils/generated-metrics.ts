import { z } from 'zod';

import type { JobView } from '@/server/jobs/types';
import { generatedMetricSchema } from '@/server/metrics/schemas';
import type { GeneratedMetricDraft } from '@/server/metrics/types';

const generatedMetricsSchema = z.array(generatedMetricSchema);

export const readGeneratedMetrics = (
  job: JobView | undefined,
): GeneratedMetricDraft[] => {
  if (!job?.result) return [];
  const parsed = generatedMetricsSchema.safeParse(job.result.metrics);
  if (!parsed.success) return [];
  return parsed.data;
};
