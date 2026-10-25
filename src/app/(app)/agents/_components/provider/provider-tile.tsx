'use client';

import { CheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { AgentProvider } from '@/generated/prisma/enums';

import { PROVIDER_TILE_LABEL } from '../../_constants/provider-display';
import { ProviderMonogram } from './provider-monogram';
import { SelectedTileBadge } from './selected-tile-badge';

type ProviderTileProps = {
  provider: AgentProvider;
  selected: boolean;
  onSelect: (provider: AgentProvider) => void;
};

export function ProviderTile({
  provider,
  selected,
  onSelect,
}: ProviderTileProps) {
  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-pressed={selected}
      aria-label={PROVIDER_TILE_LABEL[provider]}
      className="relative flex h-16 flex-col gap-1.5 rounded-lg border border-border bg-background px-1 text-[11px] font-medium text-foreground hover:bg-muted aria-pressed:border-2 aria-pressed:border-foreground"
      onClick={() => onSelect(provider)}
    >
      <ProviderMonogram provider={provider} className="size-5 text-[11px]" />
      <span className="max-w-full truncate">
        {PROVIDER_TILE_LABEL[provider]}
      </span>
      <SelectedTileBadge selected={selected}>
        <CheckIcon className="size-2.5" />
      </SelectedTileBadge>
    </Button>
  );
}
