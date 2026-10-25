import type { JobKind } from '@/generated/prisma/enums';
import type { JobView } from '@/server/jobs/types';

export type HiddenBefore = Partial<Record<JobKind, number>>;

export const panelJobs = (jobs: JobView[], kind: JobKind, hiddenBefore = 0) =>
  jobs.filter(
    (job) => job.kind === kind && job.createdAt.getTime() > hiddenBefore,
  );

export const latestJobTime = (jobs: JobView[], kind: JobKind) =>
  jobs
    .filter((job) => job.kind === kind)
    .reduce((latest, job) => Math.max(latest, job.createdAt.getTime()), 0);

export const visiblePanelKinds = (
  jobs: JobView[],
  hiddenBefore: HiddenBefore,
  pinnedKinds: JobKind[],
) => {
  const kinds = new Set<JobKind>(pinnedKinds);
  for (const job of jobs) {
    if (job.createdAt.getTime() > (hiddenBefore[job.kind] ?? 0)) {
      kinds.add(job.kind);
    }
  }
  return [...kinds].toSorted(
    (left, right) => latestJobTime(jobs, left) - latestJobTime(jobs, right),
  );
};

export const withKind = (kinds: JobKind[], kind: JobKind) => {
  if (kinds.includes(kind)) return kinds;
  return [...kinds, kind];
};
