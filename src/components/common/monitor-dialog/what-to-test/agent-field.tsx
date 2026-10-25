'use client';

import { BotIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import type { MonitorAgentOption } from '@/server/monitors/types';

import { useMonitorAgents } from '../_hooks/use-monitor-agents';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { findAgent } from '../_utils/form/monitor-name';
import { changeMonitorAgent } from '../_utils/schedule/schedule-transitions';
import { MonitorField } from '../form/monitor-field';
import { RequiredMark } from '../form/required-mark';

const FIELD_ID = 'monitor-agent';

export function AgentField() {
  const form = useMonitorFormContext();
  const agents = useMonitorAgents();

  return (
    <Controller
      name="agentId"
      control={form.control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label="Agent"
          description={
            <>
              Select the agent to run tests with <RequiredMark />
            </>
          }
          error={fieldState.error}
        >
          <Combobox<MonitorAgentOption>
            items={agents}
            value={findAgent(agents, field.value)}
            itemToStringLabel={(agent) => agent.name}
            isItemEqualToValue={(agent, value) => agent.id === value.id}
            onValueChange={(agent) => {
              if (!agent) return;
              changeMonitorAgent(form, agent, agents);
            }}
          >
            <ComboboxTrigger
              id={FIELD_ID}
              aria-invalid={fieldState.invalid}
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between bg-background font-normal"
                />
              }
            >
              <span className="flex min-w-0 items-center gap-2">
                <BotIcon className="text-muted-foreground" />
                <span className="truncate">
                  <ComboboxValue placeholder="Select agent" />
                </span>
              </span>
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput
                placeholder="Search agents..."
                showTrigger={false}
              />
              <ComboboxEmpty>No agent found.</ComboboxEmpty>
              <ComboboxList aria-label="Suggestions">
                {(agent: MonitorAgentOption) => (
                  <ComboboxItem key={agent.id} value={agent}>
                    <span className="font-mono text-xs text-muted-foreground">
                      {agent.id}
                    </span>
                    <span className="truncate">{agent.name}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </MonitorField>
      )}
    />
  );
}
