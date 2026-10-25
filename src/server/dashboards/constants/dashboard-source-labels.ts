import { DashboardSource } from '@/generated/prisma/enums';

export const DashboardSourceLabel: Record<DashboardSource, string> = {
  [DashboardSource.call_logs]: 'Call Logs',
  [DashboardSource.runs]: 'Runs',
};
