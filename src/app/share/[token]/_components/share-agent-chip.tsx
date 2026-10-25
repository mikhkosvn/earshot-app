import { BotIcon } from 'lucide-react';

import type { AgentRef } from '@/server/results/types';

import { ShareChip } from './share-chip';

interface ShareAgentChipProps {
  agent: AgentRef | null;
}

export function ShareAgentChip({ agent }: ShareAgentChipProps) {
  if (!agent) return null;

  return (
    <ShareChip icon={BotIcon}>
      {agent.name}
      <span className="text-muted-foreground">{agent.versionLabel}</span>
    </ShareChip>
  );
}
