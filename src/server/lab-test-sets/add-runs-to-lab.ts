import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { createLabTestSet } from '@/server/lab-test-sets/create-lab-test-set';
import { addRunsToLabSchema } from '@/server/lab-test-sets/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const addRunsToLab = withValidation(
  addRunsToLabSchema,
  async ({ projectId, runIds }) => {
    await requireProjectAccess(projectId);
    const runs = await prisma.run.findMany({
      where: { id: { in: runIds }, result: { projectId } },
      select: { conversationId: true },
    });
    for (const run of runs) {
      await createLabTestSet({
        projectId,
        conversationId: run.conversationId,
        corrections: [],
      });
    }
    return { count: runs.length };
  },
);
