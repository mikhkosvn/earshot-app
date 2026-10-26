import 'server-only';

import { prisma } from '@/lib/prisma';
import { knowledgeFileIdSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';

export const deleteKnowledgeFile = withValidation(
  knowledgeFileIdSchema,
  async ({ knowledgeFileId }) => {
    const { user } = await requireUser();
    const row = await prisma.knowledgeBaseFile.findUniqueOrThrow({
      where: { id: knowledgeFileId, agent: agentAccessWhere(user.id) },
      select: { id: true, agentId: true, fileId: true },
    });
    addEventFields({
      agent: { id: row.agentId },
      knowledge_file: { id: row.id, file_id: row.fileId },
    });
    await deleteFile(row.fileId);
    return { id: row.id, agentId: row.agentId };
  },
);
