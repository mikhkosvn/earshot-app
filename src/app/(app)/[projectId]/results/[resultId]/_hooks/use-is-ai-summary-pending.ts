'use client';

import { AiSummaryStatus } from '@/generated/prisma/enums';

import { useIsResultOpen } from './use-is-result-open';
import { useResultDetail } from './use-result-detail';

export const useIsAiSummaryPending = () => {
  const { aiSummary } = useResultDetail();
  const isOpen = useIsResultOpen();
  if (aiSummary.status === AiSummaryStatus.pending) return true;
  return aiSummary.status === null && isOpen;
};
