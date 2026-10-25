'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { AgentService } from '../../../_service';

type AgentSwitcherItemsProps = {
  projectId: number;
  currentAgentId: number;
};

export function AgentSwitcherItems({
  projectId,
  currentAgentId,
}: AgentSwitcherItemsProps) {
  const router = useRouter();
  const { data: agents } = useSuspenseQuery(
    AgentService.getOptionsQuery({ projectId }),
  );

  return agents.map((agent) => (
    <DropdownMenuItem
      key={agent.id}
      data-current={agent.id === currentAgentId}
      className="text-xs data-[current=true]:font-semibold"
      onClick={() => router.push(UrlGenerator.agent({ agentId: agent.id }))}
    >
      {agent.name}
    </DropdownMenuItem>
  ));
}
