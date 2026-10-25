import type { JobView } from '@/server/jobs/types';
import { testCallProgressSchema } from '@/server/agents/schemas';

export const testCallProgressOf = (job: JobView | undefined) => {
  if (!job) return null;
  const parsed = testCallProgressSchema.safeParse(job.result);
  if (!parsed.success) return null;
  return parsed.data;
};

export const connectionCountText = (count: number) => {
  if (count === 1) return '1 connection';
  return `${count} connections`;
};
