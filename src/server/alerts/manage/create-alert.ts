import 'server-only';

import { ChangeDirection } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { AlertTypeLabel } from '@/server/alerts/constants/alert-type-labels';
import { createAlertSchema } from '@/server/alerts/schemas';
import type { AlertParams } from '@/server/alerts/types';
import { EMPTY_ALERT_FILTERS } from '@/server/alerts/utils/alert-filters';
import { alertParamsData } from '@/server/alerts/utils/alert-params-data';
import { assertAlertTypeAllowed } from '@/server/alerts/utils/assert-alert-type';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const nameOf = (name: string, metricName: string, params: AlertParams) => {
  if (name) return name;
  return `${metricName} · ${AlertTypeLabel[params.type]}`;
};

export const createAlert = withValidation(
  createAlertSchema,
  async ({ projectId, metricId, name, params }) => {
    await requireProjectAccess(projectId);
    const metric = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId, projectId },
      select: { id: true, name: true, evalType: true },
    });
    assertAlertTypeAllowed(metric.evalType, params);
    const alert = await prisma.alertRule.create({
      data: {
        metricId: metric.id,
        name: nameOf(name, metric.name, params),
        enabled: true,
        direction: ChangeDirection.both,
        filters: EMPTY_ALERT_FILTERS,
        ...alertParamsData(params),
      },
      select: { id: true },
    });
    addEventFields({
      project: { id: projectId },
      metric: { id: metric.id, eval_type: metric.evalType },
      alert: { id: alert.id, type: params.type },
    });
    return alert;
  },
);
