import 'server-only';

import { prisma } from '@/lib/prisma';
import { createMockToolSchema } from '@/server/agents/schemas';
import { assertMockToolNameFree } from '@/server/agents/utils/assert-mock-tool-name-free';
import { toMappingRows } from '@/server/agents/utils/mock-tool-mappings';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const createMockTool = withValidation(
  createMockToolSchema,
  async ({ agentId, name, description, mappings }) => {
    const { agent } = await requireAgentAccess(agentId);
    await assertMockToolNameFree({ agentId, name });
    const created = await prisma.mockTool.create({
      data: {
        agentId,
        name,
        description: description || null,
        mappings: { create: toMappingRows(mappings) },
      },
      select: { id: true, agentId: true },
    });
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId },
      mock_tool: { id: created.id, mapping_count: mappings.length },
    });
    return created;
  },
);
