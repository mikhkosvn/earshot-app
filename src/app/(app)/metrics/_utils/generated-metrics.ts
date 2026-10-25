import type { JobView } from '@/server/jobs/types';
import type {
  GeneratedMetricDraft,
  MetricGenerationJobResult,
} from '@/server/metrics/types';

export const readGeneratedMetrics = (
  job: JobView | undefined,
): GeneratedMetricDraft[] => {
  if (!job?.result) return [];
  const result = job.result as unknown as Partial<MetricGenerationJobResult>;
  if (!Array.isArray(result.metrics)) return [];
  return result.metrics;
};
