import 'server-only';

import { z } from 'zod';

import { Prisma } from '@/generated/prisma/client';
import {
  CreationMethod,
  GenerationSessionStatus,
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { GenerationStepText } from '@/server/evaluator-generation/constants';
import { GenerationStep } from '@/server/evaluator-generation/constants/generation-step';
import { generationOptionsSchema } from '@/server/evaluator-generation/schemas';
import type {
  GenerationJobInput,
  GenerationJobResult,
  GenerationOptions,
} from '@/server/evaluator-generation/types';
import { resolveAgentSpeaksFirst } from '@/server/evaluator-generation/utils/agent-speaks-first';
import { scenarioDraftMock } from '@/server/evaluator-generation/utils/generation-mocks';
import { sessionDeepLink } from '@/server/evaluator-generation/utils/session-records';
import { DEFAULT_SCENARIO_TOOLS } from '@/server/evaluators/constants/scenario-tool-descriptions';
import { evaluatorFieldsSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { AgentEvaluatorDefaults } from '@/server/evaluators/types';
import { getAgentEvaluatorDefaults } from '@/server/evaluators/utils/agent-evaluator-defaults';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { createEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';
import type { JobContext } from '@/server/jobs/types';
import { generatedTestProfileName } from '@/server/test-profiles/utils/test-profile-names';
import { toVariableRows } from '@/server/test-profiles/utils/variable-rows';

const SYSTEM_PROMPT =
  'You write one test evaluator for a voice agent from a scenario instruction. Write the caller instructions in the second person inside <scenario></scenario> tags and use {{test_profile.<key>}} variables for every personal detail. Write the expected outcome as one checkable sentence per line about the main agent. Give the test profile variables that the instructions use: main agent variables are sent to the agent under test, testing agent variables are known to the caller. Give a short, specific name. The first message is empty when the agent speaks first.';

const variableSchema = z.object({ key: z.string(), value: z.string() });

const draftSchema = z.object({
  name: z.string(),
  firstMessage: z.string(),
  instructions: z.string(),
  expectedOutcomePrompt: z.string(),
  mainAgentVariables: z.array(variableSchema),
  testingAgentVariables: z.array(variableSchema),
});

type Draft = z.infer<typeof draftSchema>;

const loadSession = (sessionId: number) =>
  prisma.evaluatorGenerationSession.findUniqueOrThrow({
    where: { id: sessionId },
    select: {
      id: true,
      projectId: true,
      createdById: true,
      options: true,
      agent: {
        select: {
          id: true,
          name: true,
          description: true,
          agentSpeaksFirst: true,
          mockToolsEnabled: true,
          mockTools: {
            select: {
              id: true,
              mappings: {
                select: { input: true, output: true },
                orderBy: { position: Prisma.SortOrder.asc },
                take: 1,
              },
            },
            orderBy: { name: Prisma.SortOrder.asc },
          },
        },
      },
      messages: {
        select: { role: true, content: true },
        orderBy: { position: Prisma.SortOrder.asc },
      },
    },
  });

type LoadedSession = Awaited<ReturnType<typeof loadSession>>;
type LoadedAgent = NonNullable<LoadedSession['agent']>;

const expectedToolCalls = (agent: LoadedAgent) => {
  if (!agent.mockToolsEnabled) return [];
  return agent.mockTools.flatMap((tool) =>
    tool.mappings.map((mapping) => ({
      mockToolId: tool.id,
      input: JSON.stringify(mapping.input),
      output: JSON.stringify(mapping.output),
    })),
  );
};

const pickPersonalityId = (
  options: GenerationOptions,
  defaults: AgentEvaluatorDefaults,
  index: number,
) => {
  if (options.personalityIds.length > 0) {
    return options.personalityIds[index % options.personalityIds.length];
  }
  return defaults.personalityId;
};

const pickFirstMessage = (options: GenerationOptions, draft: Draft) => {
  if (options.firstMessage !== null) return options.firstMessage;
  return draft.firstMessage;
};

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The scenario could not be created.';
};

const testProfileFor = async (
  tx: Prisma.TransactionClient,
  session: LoadedSession,
  agent: LoadedAgent,
  options: GenerationOptions,
  draft: Draft,
) => {
  if (options.testProfileId !== null) return options.testProfileId;
  const profile = await tx.testProfile.create({
    data: {
      projectId: session.projectId,
      agentId: agent.id,
      name: generatedTestProfileName(agent.id),
      createdById: session.createdById,
      updatedById: session.createdById,
      variables: {
        create: toVariableRows(
          draft.mainAgentVariables,
          draft.testingAgentVariables,
        ),
      },
    },
    select: { id: true },
  });
  return profile.id;
};

const createScenario = async (
  session: LoadedSession,
  agent: LoadedAgent,
  options: GenerationOptions,
  draft: Draft,
  index: number,
) =>
  prisma.$transaction(async (tx) => {
    const defaults = await getAgentEvaluatorDefaults(
      tx,
      session.projectId,
      agent.id,
    );
    const userId = session.createdById;
    const fields = evaluatorFieldsSchema.parse({
      agentId: agent.id,
      name: draft.name,
      folderPath: options.folderPath,
      tags: options.tags,
      scenarioType: options.evaluatorFormat,
      testProfileId: await testProfileFor(tx, session, agent, options, draft),
      firstMessage: pickFirstMessage(options, draft),
      instructions: draft.instructions,
      personalityId: pickPersonalityId(options, defaults, index),
      language: defaults.language,
      expectedOutcomePrompt: draft.expectedOutcomePrompt,
      metricIds: defaults.metricIds,
      expectedToolCalls: expectedToolCalls(agent),
      phoneNumberId: options.phoneNumberId,
      tools: options.tools ?? DEFAULT_SCENARIO_TOOLS,
      maxDurationSeconds: null,
    });
    const created = await createEvaluatorRecord(tx, {
      projectId: session.projectId,
      userId,
      fields,
      creationMethod: CreationMethod.auto_generated,
      generationSessionId: session.id,
    });
    await recordEvaluatorVersion(tx, { evaluatorId: created.id, userId });
    return created.id;
  });

const scenarioCount = (count: number) => {
  if (count === 1) return '1 scenario';
  return `${count} scenarios`;
};

const notifyDone = async (
  session: LoadedSession,
  agent: LoadedAgent,
  count: number,
  deepLink: string,
) => {
  if (!session.createdById) return;
  await prisma.notification.create({
    data: {
      userId: session.createdById,
      projectId: session.projectId,
      eventType: NotificationEventType.scenario_generation_complete,
      severity: NotificationSeverity.success,
      title: 'Scenarios generated',
      body: `${scenarioCount(count)} for '${agent.name}' is ready. Open to review and accept.`,
      deepLink,
    },
  });
};

export const runGenerationJob = async (
  context: JobContext<GenerationJobInput>,
) => {
  const session = await loadSession(context.input.sessionId);
  const agent = session.agent;
  if (!agent) throw new Error('The agent of the generation session is gone.');
  const options = generationOptionsSchema.parse(session.options);
  const agentSpeaksFirst = resolveAgentSpeaksFirst(
    agent.agentSpeaksFirst,
    session.messages,
  );
  const progress: GenerationJobResult = {
    agentId: agent.id,
    sessionId: session.id,
    completedScenarios: 0,
    failedScenarios: 0,
    totalScenarios: context.input.instructions.length,
    scenarioIds: [],
    errors: [],
  };
  await context.setResult(progress);
  await context.setStep(GenerationStepText.generating);

  for (const [index, instruction] of context.input.instructions.entries()) {
    try {
      const draft = await generateObject({
        system: SYSTEM_PROMPT,
        prompt: `Agent: ${agent.name}\nDescription: ${agent.description}\nAgent speaks first: ${String(agentSpeaksFirst)}\nScenario instruction: ${instruction}`,
        schema: draftSchema,
        mock: () => scenarioDraftMock(instruction, index, agentSpeaksFirst),
      });
      const evaluatorId = await createScenario(
        session,
        agent,
        options,
        draft,
        index,
      );
      progress.completedScenarios += 1;
      progress.scenarioIds.push(evaluatorId);
    } catch (error) {
      recordStepFailure(GenerationStep.scenario_create, error);
      progress.failedScenarios += 1;
      progress.errors.push(errorText(error));
    }
    await context.setResult(progress);
  }

  await prisma.evaluatorGenerationSession.update({
    where: { id: session.id },
    data: { status: GenerationSessionStatus.completed },
  });
  const deepLink = sessionDeepLink({
    projectId: session.projectId,
    folderPath: options.folderPath,
    jobId: context.jobId,
  });
  addEventFields({
    generation_session: { id: session.id },
    agent: { id: agent.id },
    scenarios: {
      total: progress.totalScenarios,
      completed: progress.completedScenarios,
      failed: progress.failedScenarios,
    },
  });
  await notifyDone(session, agent, progress.completedScenarios, deepLink);
  await context.setStep(GenerationStepText.complete);
  await context.setResult({
    ...progress,
    summary: `${progress.completedScenarios} of ${progress.totalScenarios} scenarios generated`,
    deepLink,
  });
};
