import 'server-only';

import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { AgentDetail } from '@/server/agents/types';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import {
  agentDetailInclude,
  toAgentDetail,
} from '@/server/agents/utils/to-agent-detail';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';

export const getAgent = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<AgentDetail> => {
    const { user } = await requireUser();
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId, ...agentAccessWhere(user.id) },
      include: agentDetailInclude,
    });
    return toAgentDetail(agent);
  },
);
