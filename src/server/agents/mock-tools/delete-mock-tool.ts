import 'server-only';

import { prisma } from '@/lib/prisma';
import { mockToolIdSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const deleteMockTool = withValidation(
  mockToolIdSchema,
  async ({ mockToolId }) => {
    const { user } = await requireUser();
    await prisma.mockTool.findUniqueOrThrow({
      where: { id: mockToolId, agent: agentAccessWhere(user.id) },
      select: { id: true },
    });
    const deleted = await prisma.mockTool.delete({
      where: { id: mockToolId },
      select: { id: true, agentId: true },
    });
    addEventFields({
      agent: { id: deleted.agentId },
      mock_tool: { id: deleted.id },
    });
    return deleted;
  },
);
