import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateAlertSchema } from '@/server/alerts/schemas';
import type { AlertParams } from '@/server/alerts/types';
import { requireAlertAccess } from '@/server/alerts/utils/alert-access';
import { alertParamsData } from '@/server/alerts/utils/alert-params-data';
import { assertAlertTypeAllowed } from '@/server/alerts/utils/assert-alert-type';
import { ActionError, withValidation } from '@/server/common/run-action';

const paramsData = (params: AlertParams | undefined) => {
  if (!params) return {};
  return alertParamsData(params);
};

const nameData = (name: string | undefined) => {
  if (name === undefined) return {};
  if (!name) throw new ActionError('Enter a name for the alert.', 422);
  return { name };
};

export const updateAlert = withValidation(
  updateAlertSchema,
  async ({ alertId, name, enabled, params, direction, filters }) => {
    const { alert } = await requireAlertAccess(alertId);
    if (params) assertAlertTypeAllowed(alert.metric.evalType, params);
    return prisma.alertRule.update({
      where: { id: alert.id },
      data: {
        ...nameData(name),
        ...paramsData(params),
        ...(enabled !== undefined && { enabled }),
        ...(direction !== undefined && { direction }),
        ...(filters !== undefined && { filters }),
      },
      select: { id: true },
    });
  },
);
