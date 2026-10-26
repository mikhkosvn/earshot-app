import 'server-only';

import { prisma } from '@/lib/prisma';
import { setMockToolsEnabledSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const setMockToolsEnabled = withValidation(
  setMockToolsEnabledSchema,
  async ({ agentId, enabled }) => {
    const { agent } = await requireAgentAccess(agentId);
    const updated = await prisma.agent.update({
      where: { id: agentId },
      data: { mockToolsEnabled: enabled },
      select: { id: true, mockToolsEnabled: true },
    });
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId, mock_tools_enabled: updated.mockToolsEnabled },
    });
    return updated;
  },
);
