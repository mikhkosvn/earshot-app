export const JobsActionOperation = {
  getJob: 'jobs.get_job',
  listRecentJobs: 'jobs.list_recent_jobs',
  dismissJob: 'jobs.dismiss_job',
  dismissAllJobs: 'jobs.dismiss_all_jobs',
} as const;

export type JobsActionOperation =
  (typeof JobsActionOperation)[keyof typeof JobsActionOperation];
