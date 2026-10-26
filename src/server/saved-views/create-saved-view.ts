import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { createSavedViewSchema } from '@/server/saved-views/schemas';
import type { SavedViewItem } from '@/server/saved-views/types';
import {
  savedViewSelect,
  toSavedViewItem,
} from '@/server/saved-views/utils/saved-view-item';

export const createSavedView = withValidation(
  createSavedViewSchema,
  async ({ projectId, name, agentIds }): Promise<SavedViewItem> => {
    await requireProjectAccess(projectId);
    const existing = await prisma.savedView.findUnique({
      where: { projectId_name: { projectId, name } },
      select: { id: true },
    });
    if (existing)
      throw new ActionError('A view with this name already exists.');
    const agents = await prisma.agent.findMany({
      where: { projectId, id: { in: agentIds } },
      select: { id: true },
    });
    const row = await prisma.savedView.create({
      data: {
        projectId,
        name,
        agents: { create: agents.map((agent) => ({ agentId: agent.id })) },
      },
      select: savedViewSelect,
    });
    addEventFields({
      saved_view: { id: row.id, agent_count: agents.length },
    });
    return toSavedViewItem(row);
  },
);
