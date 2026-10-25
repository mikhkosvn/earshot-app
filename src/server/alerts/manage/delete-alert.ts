import 'server-only';

import { prisma } from '@/lib/prisma';
import { alertIdSchema } from '@/server/alerts/schemas';
import { requireAlertAccess } from '@/server/alerts/utils/alert-access';
import { withValidation } from '@/server/common/run-action';

export const deleteAlert = withValidation(
  alertIdSchema,
  async ({ alertId }) => {
    const { alert } = await requireAlertAccess(alertId);
    await prisma.alertRule.delete({ where: { id: alert.id } });
    return { id: alert.id };
  },
);
