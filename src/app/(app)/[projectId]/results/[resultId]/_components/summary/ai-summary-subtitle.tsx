'use client';

import { AiSummaryStatus } from '@/generated/prisma/enums';

import { useIsAiSummaryPending } from '../../_hooks/use-is-ai-summary-pending';
import { useResultDetail } from '../../_hooks/use-result-detail';

const subtitleOf = (status: AiSummaryStatus | null, isPending: boolean) => {
  if (isPending) return 'Analyzing this result…';
  if (status === AiSummaryStatus.skipped_no_failures) {
    return 'No failures to explain on this result';
  }
  return null;
};

export function AiSummarySubtitle() {
  const { aiSummary } = useResultDetail();
  const isPending = useIsAiSummaryPending();
  const subtitle = subtitleOf(aiSummary.status, isPending);
  if (!subtitle) return null;

  return <p className="text-xs text-muted-foreground">{subtitle}</p>;
}
