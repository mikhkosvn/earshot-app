import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { AgentRef } from '@/server/results/types';

interface ResultAgentCellProps {
  agent: AgentRef | null;
}

export function ResultAgentCell({ agent }: ResultAgentCellProps) {
  if (!agent) return <span className="text-muted-foreground">-</span>;

  return (
    <Link
      href={UrlGenerator.agent({ agentId: agent.id })}
      aria-label={`Go to agent: ${agent.name}`}
      className="inline-flex max-w-56 items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium hover:bg-muted"
      onClick={(event) => event.stopPropagation()}
    >
      <span className="truncate">{agent.name}</span>
      <span className="shrink-0 text-muted-foreground">
        {agent.versionLabel}
      </span>
      <ArrowUpRightIcon className="size-3 shrink-0" />
    </Link>
  );
}
