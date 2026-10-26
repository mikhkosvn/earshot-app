import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateMockToolSchema } from '@/server/agents/schemas';
import { assertMockToolNameFree } from '@/server/agents/utils/assert-mock-tool-name-free';
import { toMappingRows } from '@/server/agents/utils/mock-tool-mappings';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const updateMockTool = withValidation(
  updateMockToolSchema,
  async ({ mockToolId, name, description, mappings }) => {
    const { user } = await requireUser();
    const tool = await prisma.mockTool.findUniqueOrThrow({
      where: { id: mockToolId, agent: agentAccessWhere(user.id) },
      select: { id: true, agentId: true },
    });
    addEventFields({
      agent: { id: tool.agentId },
      mock_tool: { id: mockToolId, mapping_count: mappings.length },
    });
    await assertMockToolNameFree({ agentId: tool.agentId, name, mockToolId });
    return prisma.$transaction(async (tx) => {
      await tx.mockToolMapping.deleteMany({ where: { mockToolId } });
      return tx.mockTool.update({
        where: { id: mockToolId },
        data: {
          name,
          description: description || null,
          mappings: { create: toMappingRows(mappings) },
        },
        select: { id: true, agentId: true },
      });
    });
  },
);
