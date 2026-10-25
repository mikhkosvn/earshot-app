'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { AlertFilters } from '@/server/alerts/types';

import { useAlertAgentOptionsQuery } from '../../_hooks/queries/use-alert-agent-options-query';

const toggled = (ids: number[], id: number, checked: boolean) => {
  if (checked) return [...ids, id];
  return ids.filter((value) => value !== id);
};

export function FilterAgentList() {
  const { data: agents } = useAlertAgentOptionsQuery();
  const { control } = useFormContext<AlertFilters>();

  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1 text-xs font-medium">Agents</legend>
      <p className="text-[11px] text-muted-foreground">
        No agent selected means all agents.
      </p>
      <Controller
        name="agentIds"
        control={control}
        render={({ field }) => (
          <div className="flex max-h-32 flex-col gap-1.5 overflow-y-auto">
            {agents.map((agent) => (
              <Label
                key={agent.id}
                className="flex items-center gap-2 text-xs font-normal"
              >
                <Checkbox
                  checked={field.value.includes(agent.id)}
                  onCheckedChange={(checked) =>
                    field.onChange(toggled(field.value, agent.id, checked))
                  }
                />
                {agent.name}
              </Label>
            ))}
          </div>
        )}
      />
    </fieldset>
  );
}
