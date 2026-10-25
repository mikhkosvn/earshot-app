import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { projectKnowledgeIdSchema } from '@/server/project-knowledge/schemas';
import type { ProjectKnowledge } from '@/server/project-knowledge/types';
import { readLatestProjectKnowledge } from '@/server/project-knowledge/utils/read-latest-project-knowledge';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getProjectKnowledge = withValidation(
  projectKnowledgeIdSchema,
  async ({ projectId }): Promise<ProjectKnowledge> => {
    await requireProjectAccess(projectId);
    const latest = await readLatestProjectKnowledge(projectId);
    if (!latest) return { content: '', exists: false, version: null };
    return { content: latest.content, exists: true, version: latest.version };
  },
);
