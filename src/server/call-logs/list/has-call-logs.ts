import 'server-only';

import { prisma } from '@/lib/prisma';
import { projectScopeSchema } from '@/server/call-logs/schemas';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const hasCallLogs = withValidation(
  projectScopeSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    const first = await prisma.callLog.findFirst({
      where: { projectId },
      select: { id: true },
    });
    return first !== null;
  },
);
