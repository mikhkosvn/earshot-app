import 'server-only';

import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { deleteAgentSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';

export const deleteAgent = withValidation(
  deleteAgentSchema,
  async ({ agentId, deleteRelated }) => {
    await requireAgentAccess(agentId);
    const knowledgeFiles = await prisma.knowledgeBaseFile.findMany({
      where: { agentId },
      select: { fileId: true },
    });
    await prisma.$transaction(
      async (tx) => {
        if (deleteRelated) {
          const [callLogs, runs] = await Promise.all([
            tx.callLog.findMany({
              where: { agentId },
              select: { conversationId: true },
            }),
            tx.run.findMany({
              where: { result: { agentId } },
              select: { conversationId: true },
            }),
          ]);
          const conversationIds = [...callLogs, ...runs].map(
            (row) => row.conversationId,
          );
          await tx.conversation.deleteMany({
            where: { id: { in: conversationIds } },
          });
          await tx.result.deleteMany({ where: { agentId } });
          await tx.evaluator.deleteMany({ where: { agentId } });
        }
        await tx.agent.delete({ where: { id: agentId } });
      },
      { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
    );
    for (const knowledgeFile of knowledgeFiles) {
      await deleteFile(knowledgeFile.fileId);
    }
    return { agentId };
  },
);
