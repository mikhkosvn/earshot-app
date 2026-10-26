import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { renameResultSchema } from '@/server/results/schemas';

export const renameResult = withValidation(
  renameResultSchema,
  async ({ resultId, name }) => {
    const { user } = await requireUser();
    addEventFields({ result: { id: resultId } });
    await prisma.result.findUniqueOrThrow({
      where: { id: resultId, project: projectAccessWhere(user.id) },
      select: { id: true },
    });
    return prisma.result.update({
      where: { id: resultId },
      data: { name },
      select: { id: true, name: true },
    });
  },
);
