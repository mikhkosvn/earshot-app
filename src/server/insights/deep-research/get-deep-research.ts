import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { DEEP_RESEARCH_REPORTS_SHOWN } from '@/server/insights/constants/insight-limits';
import { projectScopeSchema } from '@/server/insights/schemas';
import type { DeepResearchState } from '@/server/insights/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getDeepResearch = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<DeepResearchState> => {
    const { project } = await requireProjectAccess(projectId);
    if (!project.deepResearchEnabled) return { enabled: false, reports: [] };
    const reports = await prisma.deepResearchInsight.findMany({
      where: { projectId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      take: DEEP_RESEARCH_REPORTS_SHOWN,
      select: {
        id: true,
        trigger: true,
        status: true,
        headline: true,
        errorMessage: true,
        windowStart: true,
        windowEnd: true,
        numCallsAnalyzed: true,
        createdAt: true,
        failureModes: {
          where: { dismissedAt: null },
          orderBy: { rank: Prisma.SortOrder.asc },
          select: {
            id: true,
            rank: true,
            title: true,
            description: true,
            callCount: true,
            exampleCallLogIds: true,
          },
        },
      },
    });
    return { enabled: true, reports };
  },
);
