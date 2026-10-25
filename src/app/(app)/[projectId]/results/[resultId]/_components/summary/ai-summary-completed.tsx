'use client';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { AiSummarySection } from './ai-summary-section';

export function AiSummaryCompleted() {
  const { aiSummary } = useResultDetail();

  return (
    <div className="grid gap-4 p-4 md:grid-cols-3">
      <AiSummarySection title="What happened" text={aiSummary.whatHappened} />
      <AiSummarySection
        title="Why it happened"
        text={aiSummary.whyItHappened}
      />
      <AiSummarySection title="How to fix" text={aiSummary.howToFix} />
    </div>
  );
}
