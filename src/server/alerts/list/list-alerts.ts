import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { projectScopeSchema } from '@/server/alerts/schemas';
import type { AlertRow } from '@/server/alerts/types';
import { alertRowSelect, toAlertRow } from '@/server/alerts/utils/alert-row';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listAlerts = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<AlertRow[]> => {
    await requireProjectAccess(projectId);
    const rules = await prisma.alertRule.findMany({
      where: { metric: { projectId } },
      orderBy: { id: Prisma.SortOrder.desc },
      select: alertRowSelect,
    });
    return rules.map(toAlertRow);
  },
);
