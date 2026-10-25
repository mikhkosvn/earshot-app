import { JobKind, JobStatus } from '@/generated/prisma/enums';

export const JOB_KIND_TITLE: Record<JobKind, string> = {
  [JobKind.metric_generation]: 'Metric Generation',
  [JobKind.metric_pattern_review]: 'Metric Review',
  [JobKind.evaluator_generation]: 'Evaluator Generation',
  [JobKind.evaluator_assistant]: 'Evaluator Assistant',
  [JobKind.test_call]: 'Test Call',
  [JobKind.reevaluation]: 'Reevaluation',
  [JobKind.export]: 'Export',
  [JobKind.metric_optimization]: 'Metric Optimization',
  [JobKind.insight_generation]: 'Insight Generation',
  [JobKind.call_import]: 'Call Import',
};

export const JOB_STALE_ERROR = 'The task ran longer than 15 minutes.';

export const JOB_MAX_RUNTIME_MINUTES = 15;

export const JOB_RECENT_WINDOW_HOURS = 24;

export const JOB_RECENT_LIMIT = 50;

export const JOB_POLL_INTERVAL_MS = 1500;

export const JOB_IDLE_POLL_INTERVAL_MS = 10000;

export const ACTIVE_JOB_STATUSES: JobStatus[] = [
  JobStatus.queued,
  JobStatus.running,
];

export const FINISHED_JOB_STATUSES: JobStatus[] = [
  JobStatus.completed,
  JobStatus.failed,
];
