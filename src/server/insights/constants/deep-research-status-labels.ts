import {
  DeepResearchStatus,
  DeepResearchTrigger,
} from '@/generated/prisma/enums';

export const DeepResearchStatusLabel: Record<DeepResearchStatus, string> = {
  [DeepResearchStatus.pending]: 'Pending',
  [DeepResearchStatus.running]: 'Running',
  [DeepResearchStatus.succeeded]: 'Completed',
  [DeepResearchStatus.failed]: 'Failed',
  [DeepResearchStatus.skipped_not_enough_data]: 'Skipped: not enough calls',
};

export const DeepResearchTriggerLabel: Record<DeepResearchTrigger, string> = {
  [DeepResearchTrigger.weekly]: 'Weekly report',
  [DeepResearchTrigger.on_demand]: 'On-demand run',
};
