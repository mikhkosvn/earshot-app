'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { useAgentOptions } from '@/components/common/metric-form/_hooks/use-agent-options';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { APPLY_AGENTS_HELP } from '../../../_constants/quick-mode-text';
import type { CreateMetricFormInput } from '../../../_schemas/create-metric-form-schema';
import { AgentChecklist } from './agent-checklist';

export function ApplyAgentsCard() {
  const { control } = useFormContext<CreateMetricFormInput>();
  const agents = useAgentOptions();

  return (
    <Controller
      name="agentIds"
      control={control}
      render={({ field }) => (
        <Collapsible className="rounded-lg border">
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="unstyled"
                size="unstyled"
                className="group flex w-full items-start justify-between px-3 py-2.5 text-left"
              />
            }
          >
            <span className="flex flex-col gap-1">
              <span className="text-sm font-medium">Apply to agents</span>
              <span className="text-xs font-normal text-muted-foreground">
                {field.value.length} of {agents.length} agents selected
              </span>
            </span>
            <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2 px-3 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {APPLY_AGENTS_HELP}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    field.onChange(agents.map((agent) => agent.id))
                  }
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => field.onChange([])}
                >
                  Deselect All
                </Button>
              </div>
            </div>
            <AgentChecklist
              agents={agents}
              value={field.value}
              onValueChange={field.onChange}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
    />
  );
}
