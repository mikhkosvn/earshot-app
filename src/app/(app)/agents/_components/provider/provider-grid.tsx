'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PROVIDER_TILE_ORDER } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { changeProvider } from '../../_utils/provider-transitions';
import { ProviderMoreToggle } from './provider-more-toggle';
import { ProviderTile } from './provider-tile';

type ProviderGridProps = {
  collapsedCount: number;
};

const visibleProviders = (expanded: boolean, collapsedCount: number) => {
  if (expanded) return PROVIDER_TILE_ORDER;
  return PROVIDER_TILE_ORDER.slice(0, collapsedCount);
};

export function ProviderGrid({ collapsedCount }: ProviderGridProps) {
  const form = useFormContext<AgentConfigValues>();
  const provider = useWatch({ control: form.control, name: 'provider' });
  const [expanded, setExpanded] = useState(
    () => PROVIDER_TILE_ORDER.indexOf(provider) >= collapsedCount,
  );

  return (
    <div className="flex flex-col gap-2">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${collapsedCount}, minmax(0, 1fr))`,
        }}
      >
        {visibleProviders(expanded, collapsedCount).map((item) => (
          <ProviderTile
            key={item}
            provider={item}
            selected={item === provider}
            onSelect={(next) => changeProvider(form, next)}
          />
        ))}
      </div>
      <ProviderMoreToggle
        expanded={expanded}
        onToggle={() => setExpanded((value) => !value)}
      />
    </div>
  );
}
