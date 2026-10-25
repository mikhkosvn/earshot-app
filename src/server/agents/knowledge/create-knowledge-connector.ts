import 'server-only';

import { KnowledgeConnectorType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { createKnowledgeConnectorSchema } from '@/server/agents/schemas';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';

const sourceData = (connector: KnowledgeConnectorFormValues) => {
  if (connector.type === KnowledgeConnectorType.website_scraper) {
    return { url: connector.url, query: null, credentialsEncrypted: null };
  }
  return {
    url: null,
    query: connector.query,
    credentialsEncrypted: encryptSecret(connector.serviceAccountJson),
  };
};

export const createKnowledgeConnector = withValidation(
  createKnowledgeConnectorSchema,
  async ({ agentId, connector }) => {
    await requireAgentAccess(agentId);
    return prisma.knowledgeBaseConnector.create({
      data: {
        agentId,
        name: connector.name,
        type: connector.type,
        syncEnabled: connector.syncEnabled,
        syncIntervalDays: connector.syncIntervalDays,
        ...sourceData(connector),
      },
      select: { id: true, agentId: true },
    });
  },
);
