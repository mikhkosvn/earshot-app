import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { runIdSchema } from '@/server/results/schemas';
import type { RunDetail } from '@/server/results/types';
import { loadRunDetail } from '@/server/results/utils/run-detail';

export const getRun = withValidation(
  runIdSchema,
  async ({ runId }): Promise<RunDetail> => {
    const { user } = await requireUser();
    addEventFields({ run: { id: runId } });
    await prisma.run.findUniqueOrThrow({
      where: { id: runId, result: { project: projectAccessWhere(user.id) } },
      select: { id: true },
    });
    return loadRunDetail(runId);
  },
);
