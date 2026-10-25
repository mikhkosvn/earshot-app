import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

interface CallAgentChipProps {
  agentId: number | null;
  agentName: string | null;
}

export function CallAgentChip({ agentId, agentName }: CallAgentChipProps) {
  if (agentId === null || agentName === null) return null;

  return (
    <Link
      href={UrlGenerator.agent({ agentId })}
      aria-label={`Go to agent: ${agentName}`}
      className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs hover:bg-muted"
    >
      Agent - {agentName}
      <ArrowUpRightIcon className="size-3" />
    </Link>
  );
}
