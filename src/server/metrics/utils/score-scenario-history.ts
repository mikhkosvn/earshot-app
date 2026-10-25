import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { startJob } from '@/server/jobs/start-job';
import { scoreConversation } from '@/server/metric-scoring/score-conversation';

const MAX_HISTORY_RUNS = 200;

type ScoreScenarioHistoryArgs = {
  projectId: number;
  userId: number;
  metricId: number;
  evaluatorIds: number[];
};

export const scoreScenarioHistory = async ({
  projectId,
  userId,
  metricId,
  evaluatorIds,
}: ScoreScenarioHistoryArgs) => {
  if (evaluatorIds.length === 0) return;
  await startJob({
    projectId,
    userId,
    kind: JobKind.reevaluation,
    input: { metricId, evaluatorIds },
    initialStep: 'Scoring the calls of the existing scenarios...',
    run: async (context) => {
      const runs = await prisma.run.findMany({
        where: {
          evaluatorId: { in: evaluatorIds },
          result: { projectId },
          conversation: { turns: { some: {} } },
        },
        orderBy: { createdAt: Prisma.SortOrder.desc },
        take: MAX_HISTORY_RUNS,
        select: { conversationId: true },
      });
      for (const [index, run] of runs.entries()) {
        await context.setStep(`Scoring call ${index + 1} of ${runs.length}...`);
        await scoreConversation({
          projectId,
          conversationId: run.conversationId,
          metricIds: [metricId],
        });
      }
      await context.setResult({ summary: `${runs.length} calls scored` });
    },
  });
};
