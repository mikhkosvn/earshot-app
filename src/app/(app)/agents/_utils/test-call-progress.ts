import type { JobView } from '@/server/jobs/types';
import type { TestCallProgress } from '@/server/agents/types';

const isProgress = (value: unknown): value is TestCallProgress =>
  typeof value === 'object' &&
  value !== null &&
  'connections' in value &&
  Array.isArray(value.connections);

export const testCallProgressOf = (job: JobView | undefined) => {
  if (!job || !isProgress(job.result)) return null;
  return job.result;
};

export const connectionCountText = (count: number) => {
  if (count === 1) return '1 connection';
  return `${count} connections`;
};
