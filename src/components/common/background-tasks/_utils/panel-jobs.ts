import { JobKind } from '@/generated/prisma/enums';
import { ACTIVE_JOB_STATUSES } from '@/server/jobs/constants';
import type { JobView } from '@/server/jobs/types';

import { reviewJobInput } from './review-job-input';

export type PanelScope = {
  since: number;
  closed: boolean;
};

export type ClosedPanels = Partial<Record<string, number>>;

export type StackPanel = {
  key: string;
  kind: JobKind;
  latestJob: JobView | undefined;
  latestTime: number;
};

export const panelKey = (job: JobView): string => {
  if (job.kind !== JobKind.metric_pattern_review) return job.kind;
  const input = reviewJobInput(job);
  if (!input) return job.kind;
  return `${job.kind}:${input.reviewId}`;
};

export const panelScope = (
  key: string,
  sessionStart: number,
  closedPanels: ClosedPanels,
): PanelScope => {
  const closedAt = closedPanels[key];
  if (closedAt === undefined) return { since: sessionStart, closed: false };
  return { since: closedAt, closed: true };
};

const isScopedJob = (job: JobView, scope: PanelScope) => {
  if (job.createdAt.getTime() > scope.since) return true;
  if (scope.closed) return false;
  return ACTIVE_JOB_STATUSES.includes(job.status);
};

export const panelJobs = (jobs: JobView[], key: string, scope: PanelScope) =>
  jobs.filter((job) => panelKey(job) === key && isScopedJob(job, scope));

export const latestJobTime = (jobs: JobView[], key: string) =>
  jobs
    .filter((job) => panelKey(job) === key)
    .reduce((latest, job) => Math.max(latest, job.createdAt.getTime()), 0);

export const stackPanels = (
  jobs: JobView[],
  sessionStart: number,
  closedPanels: ClosedPanels,
  pinnedKinds: JobKind[],
) => {
  const panels = new Map<string, StackPanel>();
  for (const kind of pinnedKinds) {
    panels.set(kind, { key: kind, kind, latestJob: undefined, latestTime: 0 });
  }
  for (const job of jobs) {
    const key = panelKey(job);
    if (!isScopedJob(job, panelScope(key, sessionStart, closedPanels))) {
      continue;
    }
    const time = job.createdAt.getTime();
    const current = panels.get(key);
    if (current?.latestJob && current.latestTime >= time) continue;
    panels.set(key, { key, kind: job.kind, latestJob: job, latestTime: time });
  }
  return [...panels.values()].toSorted(
    (left, right) => left.latestTime - right.latestTime,
  );
};

export const withKind = (kinds: JobKind[], kind: JobKind) => {
  if (kinds.includes(kind)) return kinds;
  return [...kinds, kind];
};
