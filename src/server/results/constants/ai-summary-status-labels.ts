import { AiSummaryStatus } from '@/generated/prisma/enums';

export const AiSummaryStatusLabel: Record<AiSummaryStatus, string> = {
  [AiSummaryStatus.pending]: 'Pending',
  [AiSummaryStatus.completed]: 'Completed',
  [AiSummaryStatus.skipped_no_failures]: 'Skipped No Failures',
};
