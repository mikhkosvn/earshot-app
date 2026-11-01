'use client';

import { useWatch } from 'react-hook-form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PROVIDER_INTEGRATIONS } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { IntegrationField } from './integration-field';
import { IntegrationSwitches } from './integration-switches';
import { RedactionField } from './redaction/redaction-field';

const INTEGRATION_ITEM_VALUE = 'integration';

interface IntegrationSettingsProps {
  apiKeyConfigured: boolean;
}

export function IntegrationSettings({
  apiKeyConfigured,
}: IntegrationSettingsProps) {
  const provider = useWatch<AgentConfigValues, 'provider'>({
    name: 'provider',
  });
  const integration = PROVIDER_INTEGRATIONS[provider];

  return (
    <Accordion
      defaultValue={[INTEGRATION_ITEM_VALUE]}
      className="rounded-lg border"
    >
      <AccordionItem value={INTEGRATION_ITEM_VALUE}>
        <AccordionTrigger className="items-center rounded-t-lg rounded-b-none bg-muted/50 px-3 py-2 text-xs font-semibold hover:no-underline">
          Integration Settings
        </AccordionTrigger>
        <AccordionContent className="flex flex-col divide-y pb-0">
          {integration.fields.map((field) => (
            <IntegrationField
              key={`${provider}-${field.label}`}
              field={field}
              apiKeyConfigured={apiKeyConfigured}
            />
          ))}
          <IntegrationSwitches provider={provider} />
          <RedactionField />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
