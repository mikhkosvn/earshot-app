import { InsightStatus } from '@/generated/prisma/enums';

export const InsightStatusLabel: Record<InsightStatus, string> = {
  [InsightStatus.pending]: 'Pending',
  [InsightStatus.running]: 'Running',
  [InsightStatus.succeeded]: 'Succeeded',
  [InsightStatus.failed]: 'Failed',
  [InsightStatus.skipped_no_failures]: 'Skipped No Failures',
};
