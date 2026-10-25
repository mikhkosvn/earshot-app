import 'server-only';

import { AlertType, ChangeDirection } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { NEW_MODE_DEFAULT_MIN_CALLS } from '@/server/alerts/constants/alert-presets';
import { AlertTypeLabel } from '@/server/alerts/constants/alert-type-labels';
import { EMPTY_ALERT_FILTERS } from '@/server/alerts/utils/alert-filters';
import { withValidation } from '@/server/common/run-action';
import { newCategoryAlertSchema } from '@/server/insights/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const setNewCategoryAlert = withValidation(
  newCategoryAlertSchema,
  async ({ projectId, metricId, enabled }) => {
    await requireProjectAccess(projectId);
    const config = await prisma.metricInsightConfig.update({
      where: { metricId, metric: { projectId } },
      data: { alertOnNewCategories: enabled },
      select: { metric: { select: { id: true, name: true } } },
    });
    const rule = await prisma.alertRule.findFirst({
      where: { metricId, type: AlertType.insight_new_mode },
      select: { id: true },
    });
    if (rule) {
      await prisma.alertRule.updateMany({
        where: { metricId, type: AlertType.insight_new_mode },
        data: { enabled },
      });
      return { metricId };
    }
    if (!enabled) return { metricId };
    await prisma.alertRule.create({
      data: {
        metricId: config.metric.id,
        name: `${config.metric.name} · ${AlertTypeLabel[AlertType.insight_new_mode]}`,
        type: AlertType.insight_new_mode,
        enabled: true,
        direction: ChangeDirection.both,
        filters: EMPTY_ALERT_FILTERS,
        minCalls: NEW_MODE_DEFAULT_MIN_CALLS,
      },
    });
    return { metricId };
  },
);
