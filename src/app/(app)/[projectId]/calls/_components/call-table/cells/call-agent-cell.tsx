import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

type CallAgentCellProps = {
  agentId: number | null;
  agentName: string | null;
};

export function CallAgentCell({ agentId, agentName }: CallAgentCellProps) {
  if (agentId === null || agentName === null) return null;

  return (
    <Link
      href={UrlGenerator.agent({ agentId })}
      aria-label={`Go to agent: ${agentName}`}
      className="inline-flex max-w-44 items-center gap-1 rounded-full border px-2 py-0.5 font-medium hover:bg-muted"
    >
      <span className="truncate">{agentName}</span>
      <ArrowUpRightIcon className="size-3 shrink-0" />
    </Link>
  );
}
