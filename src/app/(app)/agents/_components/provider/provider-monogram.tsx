import { UnplugIcon } from 'lucide-react';

import { AgentProvider } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';

import { PROVIDER_MONOGRAM } from '../../_constants/provider-display';

type ProviderMonogramProps = {
  provider: AgentProvider;
  className?: string;
};

export function ProviderMonogram({
  provider,
  className,
}: ProviderMonogramProps) {
  if (provider === AgentProvider.custom) {
    return <UnplugIcon className={cn('size-4', className)} />;
  }
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-4 items-center justify-center font-mono text-[9px] font-bold tracking-tighter',
        className,
      )}
    >
      {PROVIDER_MONOGRAM[provider]}
    </span>
  );
}
