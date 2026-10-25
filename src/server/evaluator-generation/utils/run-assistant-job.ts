import 'server-only';

import { z } from 'zod';

import { Prisma } from '@/generated/prisma/client';
import {
  ChatRole,
  JobKind,
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  ASSISTANT_THINKING_STEP,
  AssistantMode,
  AssistantStatus,
  GenerationScenarioTypeLabel,
  GenerationStepText,
} from '@/server/evaluator-generation/constants';
import { generationOptionsSchema } from '@/server/evaluator-generation/schemas';
import type {
  AssistantJobInput,
  AssistantJobResult,
} from '@/server/evaluator-generation/types';
import { resolveAgentSpeaksFirst } from '@/server/evaluator-generation/utils/agent-speaks-first';
import { decisionMock } from '@/server/evaluator-generation/utils/generation-mocks';
import { runGenerationJob } from '@/server/evaluator-generation/utils/run-generation-job';
import {
  appendSessionMessage,
  sessionDeepLink,
} from '@/server/evaluator-generation/utils/session-records';
import { startJob } from '@/server/jobs/start-job';
import type { JobContext } from '@/server/jobs/types';

const SYSTEM_PROMPT =
  'You are a test designer for voice agents. You read the description of an agent and a conversation with the user. If one fact that changes every scenario is missing (for example, whether the agent speaks first), ask exactly one short clarifying question. Otherwise write one instruction per scenario. Each instruction describes in the third person what the testing agent (the simulated caller) wants, how it behaves, and what it says. Make the instructions different from each other.';

const decisionSchema = z.object({
  needsClarification: z.boolean(),
  question: z.string().nullable(),
  message: z.string(),
  instructions: z.array(z.string()),
});

const loadSession = (sessionId: number) =>
  prisma.evaluatorGenerationSession.findUniqueOrThrow({
    where: { id: sessionId },
    select: {
      id: true,
      projectId: true,
      options: true,
      agent: {
        select: {
          id: true,
          name: true,
          description: true,
          agentSpeaksFirst: true,
        },
      },
      messages: {
        select: { role: true, content: true },
        orderBy: { position: Prisma.SortOrder.asc },
      },
    },
  });

type LoadedSession = Awaited<ReturnType<typeof loadSession>>;

const conversationText = (session: LoadedSession) =>
  session.messages
    .map((message) => `${message.role}: ${message.content}`)
    .join('\n');

const notifyQuestion = async (
  session: LoadedSession,
  userId: number | null,
  question: string,
  deepLink: string,
) => {
  if (!userId) return;
  await prisma.notification.create({
    data: {
      userId,
      projectId: session.projectId,
      eventType: NotificationEventType.scenario_agent_question,
      severity: NotificationSeverity.success,
      title: 'Scenario assistant needs your input',
      body: question,
      deepLink,
    },
  });
};

export const runAssistantJob = async (
  context: JobContext<AssistantJobInput>,
) => {
  await context.setStep(ASSISTANT_THINKING_STEP);
  const session = await loadSession(context.input.sessionId);
  const options = generationOptionsSchema.parse(session.options);
  const agentName = session.agent?.name ?? 'the agent';
  const agentSpeaksFirst = resolveAgentSpeaksFirst(
    session.agent?.agentSpeaksFirst ?? null,
    session.messages,
  );
  const userMessageCount = session.messages.filter(
    (message) => message.role === ChatRole.user,
  ).length;
  const decision = await generateObject({
    system: SYSTEM_PROMPT,
    prompt: `Agent: ${agentName}\nDescription: ${session.agent?.description ?? ''}\nScenario type: ${GenerationScenarioTypeLabel[options.scenarioType]}\nNumber of scenarios: ${options.numScenarios}\nAgent speaks first: ${String(agentSpeaksFirst)}\n\nConversation:\n${conversationText(session)}`,
    schema: decisionSchema,
    mock: () =>
      decisionMock({
        agentName,
        agentSpeaksFirst,
        userMessageCount,
        numScenarios: options.numScenarios,
        scenarioType: options.scenarioType,
        baseInstructions: options.extraInstructions,
      }),
  });
  const base = {
    mode: AssistantMode.clarify,
    sessionId: session.id,
    baseExtraInstructions: options.extraInstructions || null,
  };

  if (decision.needsClarification && decision.question) {
    const deepLink = sessionDeepLink({
      projectId: session.projectId,
      folderPath: options.folderPath,
      sessionId: session.id,
    });
    await appendSessionMessage(
      prisma,
      session.id,
      ChatRole.assistant,
      decision.question,
    );
    addEventFields({
      generation_session: { id: session.id },
      agent: { id: session.agent?.id ?? null },
      assistant: { status: AssistantStatus.needs_clarification },
    });
    await notifyQuestion(session, context.userId, decision.question, deepLink);
    const result: AssistantJobResult = {
      ...base,
      status: AssistantStatus.needs_clarification,
      message: decision.question,
      clarificationQuestions: [{ question: decision.question }],
      extraInstructionsList: [],
      generationJobId: null,
      summary: decision.question,
      deepLink,
    };
    await context.setResult(result);
    return;
  }

  const instructions = decision.instructions.slice(0, options.numScenarios);
  await appendSessionMessage(
    prisma,
    session.id,
    ChatRole.assistant,
    decision.message,
  );
  const { jobId } = await startJob({
    projectId: session.projectId,
    userId: context.userId,
    kind: JobKind.evaluator_generation,
    input: { sessionId: session.id, instructions },
    initialStep: GenerationStepText.starting,
    run: runGenerationJob,
  });
  addEventFields({
    generation_session: { id: session.id },
    agent: { id: session.agent?.id ?? null },
    assistant: {
      status: AssistantStatus.completed,
      instruction_count: instructions.length,
      generation_job_id: jobId,
    },
  });
  const result: AssistantJobResult = {
    ...base,
    status: AssistantStatus.completed,
    message: decision.message,
    clarificationQuestions: [],
    extraInstructionsList: instructions,
    generationJobId: jobId,
    summary: decision.message,
    deepLink: sessionDeepLink({
      projectId: session.projectId,
      folderPath: options.folderPath,
      jobId,
    }),
  };
  await context.setResult(result);
};
