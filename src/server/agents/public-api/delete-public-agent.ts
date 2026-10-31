import 'server-only';

import { prisma } from '@/lib/prisma';
import { agentScopeWhere } from '@/server/agents/public-api/utils/agent-scope-where';
import { deleteAgentRecord } from '@/server/agents/utils/agent-record/delete-agent-record';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';

export const deletePublicAgent = async ({
  auth,
  agentId,
}: {
  auth: ApiKeyAuth;
  agentId: number;
}) => {
  const row = await prisma.agent.findUniqueOrThrow({
    where: { id: agentId, ...agentScopeWhere(auth) },
    select: { id: true, projectId: true },
  });
  addEventFields({ organization: { id: auth.organizationId } });
  await deleteAgentRecord({
    agentId: row.id,
    projectId: row.projectId,
    deleteRelated: false,
  });
};
