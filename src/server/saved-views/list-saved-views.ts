import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listSavedViewsSchema } from '@/server/saved-views/schemas';
import type { SavedViewItem } from '@/server/saved-views/types';
import {
  savedViewSelect,
  toSavedViewItem,
} from '@/server/saved-views/utils/saved-view-item';

export const listSavedViews = withValidation(
  listSavedViewsSchema,
  async ({ projectId }): Promise<SavedViewItem[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.savedView.findMany({
      where: { projectId },
      orderBy: { name: Prisma.SortOrder.asc },
      select: savedViewSelect,
    });
    addEventFields({ saved_views: { count: rows.length } });
    return rows.map(toSavedViewItem);
  },
);
