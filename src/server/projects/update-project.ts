import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectSummarySelect } from '@/server/projects/constants/project-select';
import { updateProjectSchema } from '@/server/projects/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const updateProject = withValidation(
  updateProjectSchema,
  async ({ projectId, ...data }) => {
    await requireProjectAccess(projectId);
    addEventFields({ project: { updated_fields: Object.keys(data) } });
    return prisma.project.update({
      where: { id: projectId },
      data,
      select: projectSummarySelect,
    });
  },
);
