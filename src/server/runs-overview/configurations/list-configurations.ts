import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { projectIdSchema } from '@/server/runs-overview/schemas';
import type { RunsOverviewConfigurationItem } from '@/server/runs-overview/types';
import {
  configurationSelect,
  toConfigurationItem,
} from '@/server/runs-overview/utils/configuration-item';

export const listConfigurations = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<RunsOverviewConfigurationItem[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.runsOverviewConfiguration.findMany({
      where: { projectId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      select: configurationSelect,
    });
    addEventFields({ configuration: { count: rows.length } });
    return rows.map(toConfigurationItem);
  },
);
