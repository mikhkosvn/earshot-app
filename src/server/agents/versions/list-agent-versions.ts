import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { AgentVersionList } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const listAgentVersions = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<AgentVersionList> => {
    await requireAgentAccess(agentId);
    const versions = await prisma.agentVersion.findMany({
      where: { agentId },
      orderBy: { version: Prisma.SortOrder.desc },
      select: {
        id: true,
        version: true,
        name: true,
        changeType: true,
        changeReason: true,
        createdAt: true,
        createdBy: { select: { email: true } },
      },
    });
    const currentVersion = versions[0]?.version;
    return {
      count: versions.length,
      results: versions.map((version) => ({
        id: version.id,
        version: version.version,
        name: version.name,
        changeType: version.changeType,
        changeReason: version.changeReason,
        isCurrent: version.version === currentVersion,
        createdAt: version.createdAt,
        createdByEmail: version.createdBy?.email ?? null,
      })),
    };
  },
);
