'use client';

import { Spinner } from '@/components/ui/spinner';
import { AiSummaryStatus } from '@/generated/prisma/enums';

import { useIsAiSummaryPending } from '../../_hooks/use-is-ai-summary-pending';
import { useResultDetail } from '../../_hooks/use-result-detail';
import { AiSummaryCompleted } from './ai-summary-completed';

export function AiSummaryBody() {
  const { aiSummary } = useResultDetail();
  const isPending = useIsAiSummaryPending();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        <Spinner />
        Generating summary…
      </div>
    );
  }
  if (aiSummary.status === AiSummaryStatus.skipped_no_failures) {
    return (
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No failures detected.
      </p>
    );
  }
  if (aiSummary.status === AiSummaryStatus.completed) {
    return <AiSummaryCompleted />;
  }
  return (
    <p className="px-4 py-8 text-center text-sm text-muted-foreground">
      No summary is available for this result.
    </p>
  );
}
