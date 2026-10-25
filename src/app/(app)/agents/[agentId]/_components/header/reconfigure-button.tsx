'use client';

import { RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RECONFIGURE_PROVIDERS } from '@/server/agents/constants/provider-integrations';

import { useReconfigureAgentMutation } from '../../_hooks/mutations/use-reconfigure-agent-mutation';
import { useAgent } from '../../_hooks/use-agent';

export function ReconfigureButton() {
  const agent = useAgent();
  const reconfigure = useReconfigureAgentMutation();
  if (
    !RECONFIGURE_PROVIDERS.includes(agent.provider) ||
    !agent.apiKeyConfigured
  ) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={reconfigure.isPending}
      onClick={() => reconfigure.mutate({ agentId: agent.id })}
    >
      <RefreshCwIcon />
      Reconfigure
    </Button>
  );
}
