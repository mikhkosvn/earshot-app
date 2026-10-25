import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { failureModeIdSchema } from '@/server/insights/schemas';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const dismissResearchMode = withValidation(
  failureModeIdSchema,
  async ({ failureModeId }) => {
    const { user } = await requireUser();
    addEventFields({ deep_research_failure_mode: { id: failureModeId } });
    return prisma.deepResearchFailureMode.update({
      where: {
        id: failureModeId,
        insight: { project: projectAccessWhere(user.id) },
      },
      data: { dismissedAt: new Date() },
      select: { id: true },
    });
  },
);
