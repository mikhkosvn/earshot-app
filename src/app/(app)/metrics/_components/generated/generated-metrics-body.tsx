'use client';

import { GeneratedMetricsContent } from './generated-metrics-content';

type GeneratedMetricsBodyProps = {
  jobId: string | null;
  onSaved: () => void;
};

export function GeneratedMetricsBody({
  jobId,
  onSaved,
}: GeneratedMetricsBodyProps) {
  if (!jobId) return null;

  return (
    <GeneratedMetricsContent key={jobId} jobId={jobId} onSaved={onSaved} />
  );
}
