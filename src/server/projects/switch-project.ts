import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/projects/schemas';
import { setCurrentProjectCookie } from '@/server/projects/utils/current-project-cookie';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const switchProject = withValidation(
  projectIdSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    await setCurrentProjectCookie(projectId);
    return { projectId };
  },
);
