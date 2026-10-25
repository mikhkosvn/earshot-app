import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { projectIdSchema } from '@/server/runs-overview/schemas';
import type { RunsOverviewFilterOptions } from '@/server/runs-overview/types';

const byName = { name: Prisma.SortOrder.asc };

const named = (rows: { id: number; name: string }[]) =>
  rows.map((row) => ({ id: row.id, label: row.name }));

export const getFilterOptions = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<RunsOverviewFilterOptions> => {
    await requireProjectAccess(projectId);
    const [agents, tags, personalities, scenarios, folders, monitors] =
      await Promise.all([
        prisma.agent.findMany({
          where: { projectId },
          orderBy: byName,
          select: { id: true, name: true },
        }),
        prisma.tag.findMany({
          where: { projectId },
          orderBy: byName,
          select: { id: true, name: true },
        }),
        prisma.personality.findMany({
          where: {
            OR: [
              { projectId },
              { projectEnablements: { some: { projectId } } },
            ],
          },
          orderBy: byName,
          select: { id: true, name: true },
        }),
        prisma.evaluator.findMany({
          where: { projectId },
          orderBy: { id: Prisma.SortOrder.desc },
          select: { id: true, name: true },
        }),
        prisma.folder.findMany({
          where: { projectId },
          orderBy: { path: Prisma.SortOrder.asc },
          select: { id: true, path: true },
        }),
        prisma.monitor.findMany({
          where: { projectId },
          orderBy: byName,
          select: { id: true, name: true },
        }),
      ]);
    return {
      agents: named(agents),
      tags: named(tags),
      personalities: named(personalities),
      scenarios: scenarios.map((row) => ({
        id: row.id,
        label: `${row.id} ${row.name}`,
      })),
      folders: folders.map((row) => ({ id: row.id, label: row.path })),
      monitors: named(monitors),
    };
  },
);
