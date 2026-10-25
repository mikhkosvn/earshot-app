import { CheckIcon } from 'lucide-react';

import { ToggleGroupItem } from '@/components/ui/toggle-group';

import {
  CALL_PROVIDER_ICON,
  CALL_PROVIDER_LABEL,
  type CallProvider,
} from '../../_constants/call-providers';

interface ProviderTileProps {
  provider: CallProvider;
}

export function ProviderTile({ provider }: ProviderTileProps) {
  const Icon = CALL_PROVIDER_ICON[provider];

  return (
    <ToggleGroupItem
      value={provider}
      variant="outline"
      className="group/tile relative flex h-16 w-full flex-col items-center justify-center gap-1.5 text-xs font-normal data-pressed:border-2 data-pressed:border-foreground data-pressed:bg-background"
    >
      <Icon className="size-5" />
      {CALL_PROVIDER_LABEL[provider]}
      <span className="absolute -top-1.5 -right-1.5 hidden size-4 items-center justify-center rounded-full bg-foreground text-background group-data-pressed/tile:flex">
        <CheckIcon className="size-3" />
      </span>
    </ToggleGroupItem>
  );
}
