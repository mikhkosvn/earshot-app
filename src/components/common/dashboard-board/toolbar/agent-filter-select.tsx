'use client';

import { BotIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DraftActionType } from '../_constants/draft-action-type';
import { useAgentOptionsQuery } from '../_hooks/queries/use-agent-options-query';
import type { DashboardBoardState } from '../_utils/board-types';

const ALL_AGENTS = 'all';

interface AgentFilterSelectProps {
  board: DashboardBoardState;
}

const agentIdOf = (value: string) => {
  if (value === ALL_AGENTS) return null;
  return Number(value);
};

const valueOf = (agentId: number | null) => {
  if (agentId === null) return ALL_AGENTS;
  return String(agentId);
};

export function AgentFilterSelect({ board }: AgentFilterSelectProps) {
  const { data: agents } = useAgentOptionsQuery();
  const { filters } = board.draft;
  const items = [
    { value: ALL_AGENTS, label: 'All agents' },
    ...agents.map((agent) => ({ value: String(agent.id), label: agent.name })),
  ];

  return (
    <Select
      items={items}
      value={valueOf(filters.agentId)}
      onValueChange={(next) => {
        if (next === null) return;
        board.dispatch({
          type: DraftActionType.setFilters,
          filters: { ...filters, agentId: agentIdOf(next) },
        });
      }}
    >
      <SelectTrigger size="sm" aria-label="Agent" className="text-xs">
        <BotIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
