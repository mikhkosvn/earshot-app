import 'server-only';

import { prisma } from '@/lib/prisma';
import { agentScopeWhere } from '@/server/agents/public-api/utils/agent-scope-where';
import {
  publicAgentSelect,
  toPublicAgent,
} from '@/server/agents/public-api/utils/public-agent';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';

export const getPublicAgent = async ({
  auth,
  agentId,
}: {
  auth: ApiKeyAuth;
  agentId: number;
}) => {
  const row = await prisma.agent.findUniqueOrThrow({
    where: { id: agentId, ...agentScopeWhere(auth) },
    select: publicAgentSelect,
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: row.projectId },
    agent: { id: row.id, provider: row.provider },
  });
  return toPublicAgent(row);
};
