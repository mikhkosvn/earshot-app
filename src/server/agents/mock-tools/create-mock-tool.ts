import 'server-only';

import { prisma } from '@/lib/prisma';
import { createMockToolSchema } from '@/server/agents/schemas';
import { assertMockToolNameFree } from '@/server/agents/utils/assert-mock-tool-name-free';
import { toMappingRows } from '@/server/agents/utils/mock-tool-mappings';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const createMockTool = withValidation(
  createMockToolSchema,
  async ({ agentId, name, description, mappings }) => {
    await requireAgentAccess(agentId);
    await assertMockToolNameFree({ agentId, name });
    return prisma.mockTool.create({
      data: {
        agentId,
        name,
        description: description || null,
        mappings: { create: toMappingRows(mappings) },
      },
      select: { id: true, agentId: true },
    });
  },
);
