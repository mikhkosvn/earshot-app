import 'server-only';

import { z } from 'zod';

import { JobKind, MetricEvalType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { generateObject } from '@/server/ai/generate-object';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import {
  AGENT_DESCRIPTION_MIN_LENGTH,
  GENERATED_METRIC_COUNT,
} from '@/server/metrics/constants/definition/metric-limits';
import { generatedMetricsMock } from '@/server/metrics/generation/mocks/generated-metrics-mock';
import { startMetricGenerationSchema } from '@/server/metrics/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const draftsSchema = z.object({
  metrics: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      evalType: z.enum(MetricEvalType),
    }),
  ),
});

const SYSTEM_PROMPT = [
  'You design evaluation metrics for voice AI agents.',
  'The agent under test is the "main agent". The simulated caller is the "testing agent".',
  'Each metric is a yes or no check that an LLM judge applies to one call transcript.',
  'Give each metric a snake_case name.',
  'Write each description with the purpose, then "Success criteria (True):" and "Failure criteria (False):" as numbered lists.',
].join('\n');

export const startMetricGeneration = withValidation(
  startMetricGenerationSchema,
  async ({ projectId, agentId }) => {
    const { user } = await requireProjectAccess(projectId);
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId, projectId },
      select: { id: true, name: true, description: true },
    });
    if (agent.description.trim().length < AGENT_DESCRIPTION_MIN_LENGTH) {
      throw new ActionError(
        `The agent description needs ${AGENT_DESCRIPTION_MIN_LENGTH} characters or more. Add details to the agent first.`,
      );
    }
    addEventFields({ project: { id: projectId }, agent: { id: agent.id } });
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.metric_generation,
      input: { agentId, numMetrics: GENERATED_METRIC_COUNT },
      initialStep: `Generating ${GENERATED_METRIC_COUNT} critical metrics...`,
      run: async (context) => {
        const { metrics } = await generateObject({
          system: SYSTEM_PROMPT,
          prompt: `Agent name: ${agent.name}\nAgent description:\n${agent.description}\n\nWrite ${GENERATED_METRIC_COUNT} critical metrics for this agent.`,
          schema: draftsSchema,
          mock: () => ({
            metrics: generatedMetricsMock(agent, GENERATED_METRIC_COUNT),
          }),
        });
        await context.setStep('Metrics generation completed');
        await context.setResult({
          summary: `${metrics.length} metrics`,
          deepLink: UrlGenerator.metrics({
            values: { project: projectId, generation: context.jobId },
          }),
          agentId: agent.id,
          metrics,
        });
      },
    });
  },
);
