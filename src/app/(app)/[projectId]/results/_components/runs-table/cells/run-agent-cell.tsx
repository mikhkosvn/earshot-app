import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { AgentRef } from '@/server/results/types';

interface RunAgentCellProps {
  agent: AgentRef | null;
}

export function RunAgentCell({ agent }: RunAgentCellProps) {
  if (!agent) return null;

  return (
    <Link
      href={UrlGenerator.agent({ agentId: agent.id })}
      aria-label={`Go to agent: ${agent.name}`}
      className="inline-flex max-w-52 items-center gap-1 rounded-full border px-2 py-0.5 font-medium hover:bg-muted"
    >
      <span className="truncate">{agent.name}</span>
      <span className="text-muted-foreground">{agent.versionLabel}</span>
      <ArrowUpRightIcon className="size-3 shrink-0" />
    </Link>
  );
}
