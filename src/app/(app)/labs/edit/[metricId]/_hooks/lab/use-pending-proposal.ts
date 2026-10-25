'use client';

import { OptimizationStatus } from '@/generated/prisma/enums';

import { useLab } from './use-lab';

export const usePendingProposal = () => {
  const { optimization } = useLab();
  if (optimization?.status !== OptimizationStatus.awaiting_review) return null;
  if (!optimization.proposal) return null;
  return { ...optimization, proposal: optimization.proposal };
};
