'use client';

import { useWatch } from 'react-hook-form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { CALL_SETTINGS_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorFieldText } from '../form/monitor-field-text';
import { MonitorFormSection } from '../form/monitor-form-section';
import { AgentNumberField } from './agent-number-field';
import { RandomizeField } from './randomize-field';

const CALL_SETTINGS_ITEM_VALUE = 'call-settings';

export function ConnectionOverridesSection() {
  const { control } = useMonitorFormContext();
  const agentId = useWatch({ control, name: 'agentId' });
  if (agentId === null) return null;

  return (
    <MonitorFormSection title="Connection overrides">
      <Accordion>
        <AccordionItem value={CALL_SETTINGS_ITEM_VALUE}>
          <AccordionTrigger className="-mx-2 h-8 items-center px-2.5 py-0 hover:bg-muted hover:no-underline">
            Call settings
          </AccordionTrigger>
          <AccordionContent
            aria-label="Call settings"
            className="flex flex-col gap-3 pt-2 pb-0 [&_p:not(:last-child)]:mb-0"
          >
            <MonitorFieldText>{CALL_SETTINGS_HELP}</MonitorFieldText>
            <AgentNumberField />
            <RandomizeField />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </MonitorFormSection>
  );
}
