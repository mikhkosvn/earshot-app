'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { CALL_SETTINGS_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorFieldText } from '../form/monitor-field-text';
import { MonitorFormSection } from '../form/monitor-form-section';
import { AgentNumberField } from './agent-number-field';
import { RandomizeField } from './randomize-field';

export function ConnectionOverridesSection() {
  const { control } = useMonitorFormContext();
  const agentId = useWatch({ control, name: 'agentId' });
  if (agentId === null) return null;

  return (
    <MonitorFormSection title="Connection overrides">
      <Collapsible>
        <h4>
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                className="group -mx-2 w-[calc(100%+1rem)] justify-between font-medium"
              />
            }
          >
            Call settings
            <ChevronDownIcon className="transition-transform group-data-panel-open:rotate-180" />
          </CollapsibleTrigger>
        </h4>
        <CollapsibleContent
          aria-label="Call settings"
          className="flex flex-col gap-3 pt-2"
        >
          <MonitorFieldText>{CALL_SETTINGS_HELP}</MonitorFieldText>
          <AgentNumberField />
          <RandomizeField />
        </CollapsibleContent>
      </Collapsible>
    </MonitorFormSection>
  );
}
