'use client';

import { useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { ConnectionCheck } from '@/server/agents/types';

import type { TestCallOfferKind } from '../../_constants/test-call-offer';
import { TestCallDialogBody } from './test-call-dialog-body';

interface TestCallDialogProps {
  agentId: number;
  kind: TestCallOfferKind;
  check: ConnectionCheck | null;
  onClose: () => void;
}

export function TestCallDialog({
  agentId,
  kind,
  check,
  onClose,
}: TestCallDialogProps) {
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <Dialog
      open={check !== null}
      onOpenChange={(open) => {
        if (open) return;
        setJobId(null);
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <TestCallDialogBody
          agentId={agentId}
          kind={kind}
          check={check}
          jobId={jobId}
          onStarted={setJobId}
          onClose={() => {
            setJobId(null);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
