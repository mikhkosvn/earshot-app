import 'server-only';

import { subDays } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import {
  CallEvaluationStatus,
  CallProcessingStatus,
  DeepResearchStatus,
  type DeepResearchTrigger,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import {
  DEEP_RESEARCH_CALLS_MAX,
  DEEP_RESEARCH_MIN_CALLS,
  DEEP_RESEARCH_MODES_MAX,
  DEEP_RESEARCH_WINDOW_DAYS,
  INSIGHT_EXPLANATION_MAX,
} from '@/server/insights/constants/insight-limits';
import {
  mockResearch,
  type ResearchCall,
} from '@/server/insights/deep-research/research-mock';
import { researchResultSchema } from '@/server/insights/schemas';

const MILLISECONDS_PER_SECOND = 1000;
const TURNS_PER_CALL = 12;
const EXAMPLES_PER_MODE = 5;

const SYSTEM = [
  'You audit recent production calls of a voice AI agent.',
  'Find recurring failure modes, also ones that no metric measures.',
  `Return at most ${DEEP_RESEARCH_MODES_MAX} failure modes, the most common first.`,
  'Each failure mode has a short title, a one-sentence description, and the IDs of the calls that show it.',
  'Write the headline as one plain sentence.',
].join(' ');

const loadCalls = async (
  projectId: number,
  windowStart: Date,
  windowEnd: Date,
) => {
  const rows = await prisma.callLog.findMany({
    where: {
      projectId,
      status: CallProcessingStatus.completed,
      createdAt: { gte: windowStart, lte: windowEnd },
    },
    orderBy: { id: Prisma.SortOrder.desc },
    take: DEEP_RESEARCH_CALLS_MAX,
    select: {
      id: true,
      evaluationStatus: true,
      conversation: {
        select: {
          turns: {
            orderBy: { position: Prisma.SortOrder.asc },
            take: TURNS_PER_CALL,
            select: { role: true, content: true },
          },
          metricEvaluations: { select: { explanation: true } },
        },
      },
    },
  });
  return rows.map((row): ResearchCall => ({
    callLogId: row.id,
    failed:
      row.evaluationStatus === CallEvaluationStatus.failure ||
      row.evaluationStatus === CallEvaluationStatus.reviewed_failure,
    text: [
      ...row.conversation.turns.map((turn) => `${turn.role}: ${turn.content}`),
      ...row.conversation.metricEvaluations.flatMap((item) => item.explanation),
    ]
      .join('\n')
      .slice(0, INSIGHT_EXPLANATION_MAX * 4),
  }));
};

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The Deep Research run failed.';
};

const analyse = async (insightId: number, calls: ResearchCall[]) => {
  const ids = new Set(calls.map((call) => call.callLogId));
  const result = await generateObject({
    system: SYSTEM,
    prompt: calls
      .map((call) =>
        JSON.stringify({
          callId: call.callLogId,
          failed: call.failed,
          transcript: call.text,
        }),
      )
      .join('\n'),
    schema: researchResultSchema,
    mock: () => mockResearch(calls),
  });
  const modes = result.failureModes.slice(0, DEEP_RESEARCH_MODES_MAX);
  await prisma.deepResearchInsight.update({
    where: { id: insightId },
    data: {
      status: DeepResearchStatus.succeeded,
      headline: result.headline,
      failureModes: {
        create: modes.map((mode, index) => {
          const callLogIds = mode.callLogIds.filter((id) => ids.has(id));
          return {
            rank: index + 1,
            title: mode.title,
            description: mode.description,
            callCount: callLogIds.length,
            exampleCallLogIds: callLogIds.slice(0, EXAMPLES_PER_MODE),
          };
        }),
      },
    },
  });
  return modes.length;
};

export const runDeepResearch = async (
  projectId: number,
  trigger: DeepResearchTrigger,
) => {
  const windowEnd = new Date();
  const windowStart = subDays(windowEnd, DEEP_RESEARCH_WINDOW_DAYS);
  const started = Date.now();
  const insight = await prisma.deepResearchInsight.create({
    data: {
      projectId,
      trigger,
      windowStart,
      windowEnd,
      status: DeepResearchStatus.running,
    },
    select: { id: true },
  });
  const finish = (data: Prisma.DeepResearchInsightUpdateInput) =>
    prisma.deepResearchInsight.update({
      where: { id: insight.id },
      data: {
        ...data,
        durationSeconds: (Date.now() - started) / MILLISECONDS_PER_SECOND,
      },
    });
  try {
    const calls = await loadCalls(projectId, windowStart, windowEnd);
    await finish({ numCallsAnalyzed: calls.length });
    if (calls.length < DEEP_RESEARCH_MIN_CALLS) {
      await finish({
        status: DeepResearchStatus.skipped_not_enough_data,
        headline: `Deep Research needs at least ${DEEP_RESEARCH_MIN_CALLS} calls in the last ${DEEP_RESEARCH_WINDOW_DAYS} days.`,
      });
      return { insightId: insight.id, modes: 0, calls: calls.length };
    }
    const modes = await analyse(insight.id, calls);
    await finish({});
    return { insightId: insight.id, modes, calls: calls.length };
  } catch (error) {
    await finish({
      status: DeepResearchStatus.failed,
      errorMessage: errorText(error),
    });
    throw error;
  }
};
