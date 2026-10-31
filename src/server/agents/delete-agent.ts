import 'server-only';

import { deleteAgentSchema } from '@/server/agents/schemas';
import { deleteAgentRecord } from '@/server/agents/utils/agent-record/delete-agent-record';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const deleteAgent = withValidation(
  deleteAgentSchema,
  async ({ agentId, deleteRelated }) => {
    const { agent } = await requireAgentAccess(agentId);
    await deleteAgentRecord({
      agentId,
      projectId: agent.projectId,
      deleteRelated,
    });
    return { agentId };
  },
);
