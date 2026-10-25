import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { deleteRunsSchema } from '@/server/results/schemas';
import { deleteConversations } from '@/server/results/utils/delete-conversations';

export const deleteRuns = withValidation(
  deleteRunsSchema,
  async ({ projectId, resultId, runIds }) => {
    await requireProjectAccess(projectId);
    const runs = await prisma.run.findMany({
      where: { id: { in: runIds }, resultId, result: { projectId } },
      select: { conversationId: true },
    });
    await deleteConversations(runs.map((run) => run.conversationId));
    addEventFields({
      result: { id: resultId },
      runs: { requested_count: runIds.length, deleted_count: runs.length },
    });
    return { count: runs.length };
  },
);
