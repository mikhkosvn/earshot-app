'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAlertFilterParams } from '../../_hooks/params/use-alert-filter-params';
import { useAlertAgentOptionsQuery } from '../../_hooks/queries/use-alert-agent-options-query';

const PROJECT_SCOPE = 0;

export function AlertScopeSelect() {
  const { data: agents } = useAlertAgentOptionsQuery();
  const [{ scope }, setParams] = useAlertFilterParams();
  const items = [
    { value: PROJECT_SCOPE, label: 'Project Metrics' },
    ...agents.map((agent) => ({ value: agent.id, label: agent.name })),
  ];

  return (
    <Select
      items={items}
      value={scope ?? PROJECT_SCOPE}
      onValueChange={(value) => {
        if (value === null) return;
        void setParams({ scope: value || null });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label="Metric scope"
        className="w-48 text-xs"
      >
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
