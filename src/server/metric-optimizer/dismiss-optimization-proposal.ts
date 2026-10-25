import 'server-only';

import { OptimizationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { optimizationSessionSchema } from '@/server/metric-optimizer/schemas';
import { requireOpenSession } from '@/server/metric-optimizer/utils/require-session-access';

export const dismissOptimizationProposal = withValidation(
  optimizationSessionSchema,
  async ({ sessionId }) => {
    const { session } = await requireOpenSession(sessionId);
    await prisma.metricOptimizationSession.update({
      where: { id: sessionId },
      data: {
        status: OptimizationStatus.dismissed,
        dismissedAt: new Date(),
      },
    });
    addEventFields({
      metric: { id: session.metricId },
      optimization_session: {
        id: sessionId,
        status: OptimizationStatus.dismissed,
      },
    });
    return { sessionId, metricId: session.metricId };
  },
);
