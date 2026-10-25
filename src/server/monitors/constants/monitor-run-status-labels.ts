import { MonitorRunStatus } from '@/generated/prisma/enums';

export const MonitorRunStatusLabel: Record<MonitorRunStatus, string> = {
  [MonitorRunStatus.queued]: 'Queued',
  [MonitorRunStatus.running]: 'Running',
  [MonitorRunStatus.completed]: 'Completed',
  [MonitorRunStatus.failed]: 'Failed',
  [MonitorRunStatus.skipped]: 'Skipped',
};
