import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { categoryIdSchema } from '@/server/insights/schemas';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const dismissCategory = withValidation(
  categoryIdSchema,
  async ({ categoryId }) => {
    const { user } = await requireUser();
    const category = await prisma.failureCategory.update({
      where: {
        id: categoryId,
        metric: { project: projectAccessWhere(user.id) },
      },
      data: { dismissedAt: new Date() },
      select: { id: true },
    });
    addEventFields({ failure_category: { id: category.id } });
    return category;
  },
);
