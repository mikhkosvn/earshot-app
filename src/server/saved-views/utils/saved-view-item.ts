import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { SavedViewItem } from '@/server/saved-views/types';

export const savedViewSelect = {
  id: true,
  name: true,
  agents: { select: { agentId: true } },
} satisfies Prisma.SavedViewSelect;

type SavedViewRow = Prisma.SavedViewGetPayload<{
  select: typeof savedViewSelect;
}>;

export const toSavedViewItem = (row: SavedViewRow): SavedViewItem => ({
  id: row.id,
  name: row.name,
  agentIds: [...new Set(row.agents.map((agent) => agent.agentId))],
});
