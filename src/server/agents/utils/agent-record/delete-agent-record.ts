import 'server-only';

import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { addEventFields } from '@/server/common/logging/event-fields';
import { deleteFile } from '@/server/files/delete-file';

interface DeleteAgentRecordArgs {
  agentId: number;
  projectId: number;
  deleteRelated: boolean;
}

export const deleteAgentRecord = async ({
  agentId,
  projectId,
  deleteRelated,
}: DeleteAgentRecordArgs) => {
  const knowledgeFiles = await prisma.knowledgeBaseFile.findMany({
    where: { agentId },
    select: { fileId: true },
  });
  addEventFields({
    project: { id: projectId },
    agent: {
      id: agentId,
      delete_related: deleteRelated,
      knowledge_file_count: knowledgeFiles.length,
    },
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
        addEventFields({
          agent: { conversation_count: conversationIds.length },
        });
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
};
