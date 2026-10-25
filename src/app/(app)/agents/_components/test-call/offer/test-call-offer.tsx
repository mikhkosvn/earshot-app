'use client';

import { PhoneCallIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ConnectionCheck } from '@/server/agents/types';

import {
  TEST_CALL_INTRO,
  TEST_CALL_OFFER_CLOSE_LABEL,
  TEST_CALL_OFFER_TITLE,
  type TestCallOfferKind,
} from '../../../_constants/test-call-offer';
import { useStartTestCallMutation } from '../../../_hooks/mutations/test-call/use-start-test-call-mutation';
import { PendingLabel } from '../../pending-label';
import { CheckSummaryBox } from './check-summary-box';
import { RunTestCallButton } from './run-test-call-button';

type TestCallOfferProps = {
  agentId: number;
  kind: TestCallOfferKind;
  check: ConnectionCheck;
  onStarted: (jobId: string) => void;
  onClose: () => void;
};

export function TestCallOffer({
  agentId,
  kind,
  check,
  onStarted,
  onClose,
}: TestCallOfferProps) {
  const startTestCall = useStartTestCallMutation();
  const testable = check.connections.some((connection) => connection.testable);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{TEST_CALL_OFFER_TITLE[kind]}</DialogTitle>
        <DialogDescription>{TEST_CALL_INTRO}</DialogDescription>
      </DialogHeader>
      <CheckSummaryBox kind={kind} check={check} />
      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          {TEST_CALL_OFFER_CLOSE_LABEL[kind]}
        </Button>
        <RunTestCallButton
          testable={testable}
          disabled={startTestCall.isPending}
          onClick={() =>
            startTestCall.mutate(
              { agentId },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  onStarted(result.data.jobId);
                },
              },
            )
          }
        >
          <PhoneCallIcon />
          <PendingLabel
            pending={startTestCall.isPending}
            pendingText="Starting..."
          >
            Run test call
          </PendingLabel>
        </RunTestCallButton>
      </div>
    </>
  );
}
