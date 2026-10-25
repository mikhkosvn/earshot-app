import { OptimizationStatus } from '@/generated/prisma/enums';

export const OptimizationStatusLabel: Record<OptimizationStatus, string> = {
  [OptimizationStatus.queued]: 'Queued',
  [OptimizationStatus.running]: 'Running',
  [OptimizationStatus.awaiting_review]: 'Ready for your review',
  [OptimizationStatus.applied]: 'Applied',
  [OptimizationStatus.dismissed]: 'Dismissed',
  [OptimizationStatus.failed]: 'Failed',
};
