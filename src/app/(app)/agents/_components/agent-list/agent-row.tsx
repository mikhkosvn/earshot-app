import Link from 'next/link';

import { IdChip } from '@/components/common/clipboard/id-chip';
import { TableCell, TableRow } from '@/components/ui/table';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import type { AgentListItem } from '@/server/agents/types';

import { AgentRowActions } from '../agent-row-actions/agent-row-actions';
import { ProviderBadge } from '../provider/provider-badge';
import { AgentConnectionChip } from './agent-connection-chip';

type AgentRowProps = {
  agent: AgentListItem;
};

export function AgentRow({ agent }: AgentRowProps) {
  return (
    <TableRow>
      <TableCell>
        <IdChip id={`#${agent.id}`} />
      </TableCell>
      <TableCell className="font-medium">
        <Link
          href={UrlGenerator.agent({ agentId: agent.id })}
          className="hover:underline"
        >
          {agent.name}
        </Link>
      </TableCell>
      <TableCell>
        <ProviderBadge provider={agent.provider} />
      </TableCell>
      <TableCell>
        <AgentConnectionChip
          phoneNumber={agent.phoneNumber}
          inbound={agent.inbound}
        />
      </TableCell>
      <TableCell>{LanguageLabel[agent.language]}</TableCell>
      <TableCell>
        <AgentRowActions agent={agent} />
      </TableCell>
    </TableRow>
  );
}
