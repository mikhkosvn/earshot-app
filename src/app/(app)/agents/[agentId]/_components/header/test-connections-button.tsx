'use client';

import { PhoneCallIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { ConnectionCheck } from '@/server/agents/types';

import { TestCallOfferKind } from '../../../_constants/test-call-offer';
import { TestCallDialog } from '../../../_components/test-call/test-call-dialog';
import { useCheckAgentConnectionsMutation } from '../../_hooks/mutations/use-check-agent-connections-mutation';
import { useAgentId } from '../../_hooks/use-agent-id';

export function TestConnectionsButton() {
  const agentId = useAgentId();
  const checkConnections = useCheckAgentConnectionsMutation();
  const [check, setCheck] = useState<ConnectionCheck | null>(null);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={checkConnections.isPending}
        onClick={() =>
          checkConnections.mutate(
            { agentId },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setCheck(result.data);
              },
            },
          )
        }
      >
        <PhoneCallIcon />
        Test connections
      </Button>
      <TestCallDialog
        agentId={agentId}
        kind={TestCallOfferKind.connections}
        check={check}
        onClose={() => setCheck(null)}
      />
    </>
  );
}
