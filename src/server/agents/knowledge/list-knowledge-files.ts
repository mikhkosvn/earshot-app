import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { KnowledgeFileItem } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const listKnowledgeFiles = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<KnowledgeFileItem[]> => {
    await requireAgentAccess(agentId);
    const rows = await prisma.knowledgeBaseFile.findMany({
      where: { agentId },
      orderBy: { id: Prisma.SortOrder.asc },
      select: {
        id: true,
        createdAt: true,
        file: {
          select: {
            id: true,
            fileName: true,
            contentType: true,
            sizeBytes: true,
          },
        },
      },
    });
    return rows.map((row) => ({
      id: row.id,
      fileId: row.file.id,
      fileName: row.file.fileName,
      contentType: row.file.contentType,
      sizeBytes: row.file.sizeBytes,
      createdAt: row.createdAt,
    }));
  },
);
