import type { AgentProvider } from '@/generated/prisma/enums';

import { PROVIDER_LIST_LABEL } from '../../_constants/provider-display';
import { ProviderMonogram } from './provider-monogram';

type ProviderBadgeProps = {
  provider: AgentProvider;
};

export function ProviderBadge({ provider }: ProviderBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <ProviderMonogram provider={provider} className="text-muted-foreground" />
      {PROVIDER_LIST_LABEL[provider]}
    </span>
  );
}
