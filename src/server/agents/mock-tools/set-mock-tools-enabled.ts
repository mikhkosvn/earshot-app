import 'server-only';

import { prisma } from '@/lib/prisma';
import { setMockToolsEnabledSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const setMockToolsEnabled = withValidation(
  setMockToolsEnabledSchema,
  async ({ agentId, enabled }) => {
    await requireAgentAccess(agentId);
    return prisma.agent.update({
      where: { id: agentId },
      data: { mockToolsEnabled: enabled },
      select: { id: true, mockToolsEnabled: true },
    });
  },
);
