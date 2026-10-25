import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

type AgentChipProps = {
  agentId: number | null;
  agentName: string | null;
};

export function AgentChip({ agentId, agentName }: AgentChipProps) {
  if (agentId === null || !agentName) return '-';

  return (
    <Link
      href={UrlGenerator.agent({ agentId })}
      aria-label={`Go to agent: ${agentName}`}
      className="inline-flex max-w-44 items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
    >
      <span className="truncate">{agentName}</span>
      <ArrowUpRightIcon className="size-3 shrink-0" />
    </Link>
  );
}
