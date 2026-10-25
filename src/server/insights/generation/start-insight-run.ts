import 'server-only';

import { InsightStatus, JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { evaluateInsightAlerts } from '@/server/alerts/evaluation/evaluate-insight-alerts';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import {
  type InsightRunOutcome,
  runFailureModeInsight,
} from '@/server/insights/generation/run-failure-mode-insight';
import { runInsightSchema } from '@/server/insights/schemas';
import type { InsightJobStarted } from '@/server/insights/types';
import { insightWindowOf } from '@/server/insights/utils/insight-window';
import { startJob } from '@/server/jobs/start-job';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const summaryOf = (metricName: string, outcome: InsightRunOutcome) => {
  if (outcome.status === InsightStatus.skipped_no_failures) {
    return `${metricName}: no failures in this window.`;
  }
  return `${metricName}: ${outcome.failures} failure(s) in ${outcome.categories} category group(s).`;
};

export const startInsightRun = withValidation(
  runInsightSchema,
  async ({ projectId, metricId, from, to }): Promise<InsightJobStarted> => {
    const { user } = await requireProjectAccess(projectId);
    const metric = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId, projectId },
      select: {
        id: true,
        name: true,
        insightConfig: { select: { enabled: true } },
      },
    });
    if (!metric.insightConfig?.enabled) {
      throw new ActionError('Turn on insights for this metric first.', 422);
    }
    addEventFields({ project: { id: projectId }, metric: { id: metric.id } });
    const window = insightWindowOf(from, to);
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.insight_generation,
      input: { metricId, from, to },
      initialStep: `Grouping the failures of ${metric.name}`,
      run: async (context) => {
        const outcome = await runFailureModeInsight({ metricId, ...window });
        await context.setResult({
          summary: summaryOf(metric.name, outcome),
          deepLink: UrlGenerator.insights({ projectId }),
        });
        await evaluateInsightAlerts(projectId);
      },
    });
  },
);
