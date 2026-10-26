import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { MockToolItem } from '@/server/agents/types';
import {
  countFailures,
  toMappingValue,
} from '@/server/agents/utils/mock-tool-mappings';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const listMockTools = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<MockToolItem[]> => {
    const { agent } = await requireAgentAccess(agentId);
    const tools = await prisma.mockTool.findMany({
      where: { agentId },
      orderBy: { id: Prisma.SortOrder.asc },
      include: { mappings: { orderBy: { position: Prisma.SortOrder.asc } } },
    });
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId },
      mock_tools: { count: tools.length },
    });
    return tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      mappings: tool.mappings.map(toMappingValue),
      failureCount: countFailures(tool.mappings),
    }));
  },
);
