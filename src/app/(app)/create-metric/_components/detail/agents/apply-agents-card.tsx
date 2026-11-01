'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useAgentOptions } from '@/components/common/metric-form/_hooks/use-agent-options';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { APPLY_AGENTS_HELP } from '../../../_constants/quick-mode-text';
import type { CreateMetricFormInput } from '../../../_schemas/create-metric-form-schema';
import { AgentChecklist } from './agent-checklist';

const APPLY_AGENTS_ITEM_VALUE = 'apply-agents';

export function ApplyAgentsCard() {
  const { control } = useFormContext<CreateMetricFormInput>();
  const agents = useAgentOptions();

  return (
    <Controller
      name="agentIds"
      control={control}
      render={({ field }) => (
        <Accordion className="rounded-lg border">
          <AccordionItem value={APPLY_AGENTS_ITEM_VALUE}>
            <AccordionTrigger className="px-3 py-2.5 hover:no-underline">
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium">Apply to agents</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {field.value.length} of {agents.length} agents selected
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 px-3 pb-3 [&_p:not(:last-child)]:mb-0">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    />
  );
}
