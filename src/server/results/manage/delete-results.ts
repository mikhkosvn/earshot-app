import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { deleteResultsSchema } from '@/server/results/schemas';
import { deleteConversations } from '@/server/results/utils/delete-conversations';

export const deleteResults = withValidation(
  deleteResultsSchema,
  async ({ projectId, resultIds }) => {
    await requireProjectAccess(projectId);
    const where = { projectId, id: { in: resultIds } };
    const runs = await prisma.run.findMany({
      where: { result: where },
      select: { conversationId: true },
    });
    await deleteConversations(runs.map((run) => run.conversationId));
    const { count } = await prisma.result.deleteMany({ where });
    addEventFields({
      results: {
        requested_count: resultIds.length,
        deleted_count: count,
        deleted_conversation_count: runs.length,
      },
    });
    return { count };
  },
);
