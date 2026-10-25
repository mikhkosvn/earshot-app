import 'server-only';

import { DeepResearchTrigger, JobKind } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { runDeepResearch } from '@/server/insights/deep-research/run-deep-research';
import { projectScopeSchema } from '@/server/insights/schemas';
import type { InsightJobStarted } from '@/server/insights/types';
import { startJob } from '@/server/jobs/start-job';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const startDeepResearch = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<InsightJobStarted> => {
    const { user, project } = await requireProjectAccess(projectId);
    addEventFields({
      project: { id: projectId },
      deep_research: { enabled: project.deepResearchEnabled },
    });
    if (!project.deepResearchEnabled) {
      throw new ActionError(
        'Turn on Deep Research in the project settings first.',
        422,
      );
    }
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.insight_generation,
      input: { deepResearch: true },
      initialStep: 'Auditing recent calls',
      run: async (context) => {
        const outcome = await runDeepResearch(
          projectId,
          DeepResearchTrigger.on_demand,
        );
        addEventFields({
          deep_research: {
            id: outcome.insightId,
            modes: outcome.modes,
            calls: outcome.calls,
          },
        });
        await context.setResult({
          summary: `Deep Research: ${outcome.modes} failure mode(s) in ${outcome.calls} call(s).`,
          deepLink: UrlGenerator.insights({ projectId }),
        });
      },
    });
  },
);
