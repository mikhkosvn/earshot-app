import 'server-only';

import { prisma } from '@/lib/prisma';
import { uploadKnowledgeFileSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';
import { saveFile } from '@/server/files/save-file';

const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export const uploadKnowledgeFile = withValidation(
  uploadKnowledgeFileSchema,
  async ({ agentId, file }) => {
    const { agent } = await requireAgentAccess(agentId);
    const stored = await saveFile({
      projectId: agent.projectId,
      fileName: file.name,
      contentType: file.type || DEFAULT_CONTENT_TYPE,
      data: new Uint8Array(await file.arrayBuffer()),
    });
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId },
      knowledge_file: { file_id: stored.id, size_bytes: file.size },
    });
    try {
      const created = await prisma.knowledgeBaseFile.create({
        data: { agentId, fileId: stored.id },
        select: { id: true },
      });
      addEventFields({ knowledge_file: { id: created.id } });
      return created;
    } catch (error) {
      await deleteFile(stored.id);
      throw error;
    }
  },
);
