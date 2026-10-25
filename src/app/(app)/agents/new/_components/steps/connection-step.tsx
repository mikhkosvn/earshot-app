'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { AgentConfigValues } from '@/server/agents/types';

import { WIZARD_COLLAPSED_TILE_COUNT } from '../../../_constants/provider-display';
import { ConnectionsBlock } from '../../../_components/connections/connections-block';
import { IntegrationSettings } from '../../../_components/integration/integration-settings';
import { ProviderGrid } from '../../../_components/provider/provider-grid';
import { CONNECTION_STEP_FIELDS } from '../../_constants/wizard-step';

type ConnectionStepProps = {
  onNext: () => void;
};

export function ConnectionStep({ onNext }: ConnectionStepProps) {
  const { trigger } = useFormContext<AgentConfigValues>();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h2 className="text-sm font-semibold">
          Where did you build your agent?
        </h2>
        <p className="text-xs text-muted-foreground">
          Select the platform you use to build your conversational agent
        </p>
      </div>
      <ProviderGrid collapsedCount={WIZARD_COLLAPSED_TILE_COUNT} />
      <ConnectionsBlock />
      <IntegrationSettings apiKeyConfigured={false} />
      <Button
        type="button"
        className="w-full"
        onClick={async () => {
          const valid = await trigger(CONNECTION_STEP_FIELDS);
          if (!valid) return;
          onNext();
        }}
      >
        Next
      </Button>
    </div>
  );
}
