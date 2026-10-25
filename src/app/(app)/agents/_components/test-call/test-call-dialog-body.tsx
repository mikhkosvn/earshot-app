'use client';

import type { ConnectionCheck } from '@/server/agents/types';

import type { TestCallOfferKind } from '../../_constants/test-call-offer';
import { TestCallOffer } from './offer/test-call-offer';
import { TestCallProgressView } from './progress/test-call-progress-view';

interface TestCallDialogBodyProps {
  agentId: number;
  kind: TestCallOfferKind;
  check: ConnectionCheck | null;
  jobId: string | null;
  onStarted: (jobId: string) => void;
  onClose: () => void;
}

export function TestCallDialogBody({
  agentId,
  kind,
  check,
  jobId,
  onStarted,
  onClose,
}: TestCallDialogBodyProps) {
  if (!check) return null;
  if (jobId) return <TestCallProgressView jobId={jobId} onClose={onClose} />;
  return (
    <TestCallOffer
      agentId={agentId}
      kind={kind}
      check={check}
      onStarted={onStarted}
      onClose={onClose}
    />
  );
}
