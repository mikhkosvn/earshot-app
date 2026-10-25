'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PROVIDER_INTEGRATIONS } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { IntegrationField } from './integration-field';
import { IntegrationSwitches } from './integration-switches';
import { RedactionField } from './redaction/redaction-field';

interface IntegrationSettingsProps {
  apiKeyConfigured: boolean;
}

export function IntegrationSettings({
  apiKeyConfigured,
}: IntegrationSettingsProps) {
  const provider = useWatch<AgentConfigValues, 'provider'>({
    name: 'provider',
  });
  const [open, setOpen] = useState(true);
  const integration = PROVIDER_INTEGRATIONS[provider];

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-lg border"
    >
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            className="flex w-full items-center justify-between rounded-t-lg bg-muted/50 px-3 py-2 text-xs font-semibold"
          />
        }
      >
        Integration Settings
        <ChevronDownIcon className="size-4 transition-transform data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col divide-y">
        {integration.fields.map((field) => (
          <IntegrationField
            key={`${provider}-${field.label}`}
            field={field}
            apiKeyConfigured={apiKeyConfigured}
          />
        ))}
        <IntegrationSwitches provider={provider} />
        <RedactionField />
      </CollapsibleContent>
    </Collapsible>
  );
}
