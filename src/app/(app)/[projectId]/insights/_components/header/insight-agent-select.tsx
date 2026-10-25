'use client';

import { BotIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ALL_AGENTS } from '../../_constants/insights-params';
import { useInsightAgent } from '../../_hooks/params/use-insight-agent';
import { useInsightAgentOptionsQuery } from '../../_hooks/queries/use-insight-agent-options-query';

export function InsightAgentSelect() {
  const { data: agents } = useInsightAgentOptionsQuery();
  const { agentId, setAgentId } = useInsightAgent();
  const items = [
    { value: ALL_AGENTS, label: 'All agents' },
    ...agents.map((agent) => ({ value: agent.id, label: agent.name })),
  ];

  return (
    <Select
      items={items}
      value={agentId ?? ALL_AGENTS}
      onValueChange={(value) => {
        if (value === null) return;
        void setAgentId(value || null);
      }}
    >
      <SelectTrigger size="sm" aria-label="Agent" className="w-56 text-xs">
        <BotIcon className="text-muted-foreground" />
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
