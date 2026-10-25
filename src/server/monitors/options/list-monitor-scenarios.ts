import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import {
  UNFOLDERED_FOLDER_KEY,
  UNFOLDERED_FOLDER_NAME,
} from '@/server/monitors/constants/scenario-folders';
import { monitorProjectScopeSchema } from '@/server/monitors/schemas';
import type {
  MonitorScenarioFolder,
  MonitorScenarioTree,
} from '@/server/monitors/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const compareFolders = (
  left: MonitorScenarioFolder,
  right: MonitorScenarioFolder,
) => left.name.localeCompare(right.name, undefined, { sensitivity: 'base' });

export const listMonitorScenarios = withValidation(
  monitorProjectScopeSchema,
  async ({ projectId }): Promise<MonitorScenarioTree> => {
    await requireProjectAccess(projectId);
    const [folders, evaluators] = await prisma.$transaction([
      prisma.folder.findMany({
        where: { projectId },
        select: { id: true, path: true },
      }),
      prisma.evaluator.findMany({
        where: { projectId },
        select: { id: true, name: true, folderId: true },
        orderBy: { id: Prisma.SortOrder.asc },
      }),
    ]);
    const scenariosIn = (folderId: number | null) =>
      evaluators
        .filter((evaluator) => evaluator.folderId === folderId)
        .map(({ id, name }) => ({ id, name }));
    const folderGroups = folders
      .map((folder) => ({
        key: String(folder.id),
        name: folder.path,
        scenarios: scenariosIn(folder.id),
      }))
      .sort(compareFolders);
    return {
      folders: [
        ...folderGroups,
        {
          key: UNFOLDERED_FOLDER_KEY,
          name: UNFOLDERED_FOLDER_NAME,
          scenarios: scenariosIn(null),
        },
      ],
      scenarioCount: evaluators.length,
    };
  },
);
