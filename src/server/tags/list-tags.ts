import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listTagsSchema } from '@/server/tags/schemas';

export const listTags = withValidation(
  listTagsSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    const tags = await prisma.tag.findMany({
      where: { projectId },
      select: { name: true },
      orderBy: { name: Prisma.SortOrder.asc },
    });
    addEventFields({ tags: { count: tags.length } });
    return tags.map((tag) => tag.name);
  },
);
