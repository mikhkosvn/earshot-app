import { OptimizationStatus } from '@/generated/prisma/enums';

export const ACTIVE_OPTIMIZATION_STATUSES: OptimizationStatus[] = [
  OptimizationStatus.queued,
  OptimizationStatus.running,
];
