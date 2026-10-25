import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { GENERATION_MIN_SCENARIOS } from '@/server/evaluator-generation/constants';
import type {
  AssistantJobResult,
  GenerationJobResult,
  GenerationJobView,
  GenerationSessionView,
} from '@/server/evaluator-generation/types';
import { latestSessionJob } from '@/server/evaluator-generation/utils/session-records';

type JobRow = Awaited<ReturnType<typeof latestSessionJob>>;

type SessionOptionsShape = {
  folderPath?: string;
  numScenarios?: number;
};

const toJobView = <TResult>(row: JobRow): GenerationJobView<TResult> | null => {
  if (!row) return null;
  return {
    id: row.id,
    status: row.status,
    currentStep: row.currentStep,
    result: row.result as TResult | null,
    error: row.error,
  };
};

const sessionSelect = {
  id: true,
  projectId: true,
  title: true,
  status: true,
  agentId: true,
  options: true,
  createdAt: true,
  agent: { select: { name: true } },
  messages: {
    select: { id: true, role: true, content: true, createdAt: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
  evaluators: {
    select: {
      id: true,
      name: true,
      instructions: true,
      expectedOutcomePrompt: true,
      language: true,
      personality: { select: { name: true } },
      testProfile: { select: { name: true } },
      tools: { select: { tool: true } },
    },
    orderBy: { id: Prisma.SortOrder.asc },
  },
} satisfies Prisma.EvaluatorGenerationSessionSelect;

export const loadSessionView = async (
  where: Prisma.EvaluatorGenerationSessionWhereUniqueInput,
): Promise<GenerationSessionView> => {
  const session = await prisma.evaluatorGenerationSession.findUniqueOrThrow({
    where,
    select: sessionSelect,
  });
  const options = (session.options ?? {}) as SessionOptionsShape;
  const [assistantJob, generationJob] = await Promise.all([
    latestSessionJob(
      session.projectId,
      session.id,
      JobKind.evaluator_assistant,
    ),
    latestSessionJob(
      session.projectId,
      session.id,
      JobKind.evaluator_generation,
    ),
  ]);
  return {
    id: session.id,
    title: session.title,
    status: session.status,
    agentId: session.agentId,
    agentName: session.agent?.name ?? null,
    folderPath: options.folderPath ?? '',
    numScenarios: options.numScenarios ?? GENERATION_MIN_SCENARIOS,
    messages: session.messages,
    evaluators: session.evaluators.map((evaluator) => ({
      id: evaluator.id,
      name: evaluator.name,
      instructions: evaluator.instructions,
      expectedOutcomePrompt: evaluator.expectedOutcomePrompt ?? '',
      personalityName: evaluator.personality?.name ?? null,
      language: evaluator.language,
      testProfileName: evaluator.testProfile?.name ?? null,
      tools: evaluator.tools.map((entry) => entry.tool),
    })),
    assistantJob: toJobView<AssistantJobResult>(assistantJob),
    generationJob: toJobView<GenerationJobResult>(generationJob),
    createdAt: session.createdAt,
  };
};
