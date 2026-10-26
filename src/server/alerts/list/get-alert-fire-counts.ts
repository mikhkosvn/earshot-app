import 'server-only';

import { prisma } from '@/lib/prisma';
import { MILLISECONDS_PER_HOUR } from '@/server/alerts/constants/alert-limits';
import { alertReviewSchema } from '@/server/alerts/schemas';
import type { AlertFireCounts } from '@/server/alerts/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getAlertFireCounts = withValidation(
  alertReviewSchema,
  async ({ projectId, hours }): Promise<AlertFireCounts> => {
    await requireProjectAccess(projectId);
    const since = new Date(Date.now() - hours * MILLISECONDS_PER_HOUR);
    const groups = await prisma.alertTrigger.groupBy({
      by: ['alertRuleId'],
      where: {
        triggeredAt: { gte: since },
        alertRule: { metric: { projectId } },
      },
      _count: { _all: true },
    });
    addEventFields({
      project: { id: projectId },
      alert_review: { hours, alerts: groups.length },
    });
    return Object.fromEntries(
      groups.map((group) => [group.alertRuleId, group._count._all]),
    );
  },
);
