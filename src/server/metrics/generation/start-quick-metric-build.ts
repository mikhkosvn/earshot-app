import 'server-only';

import { z } from 'zod';

import { JobKind, MetricEvalType, MetricType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { generateObject } from '@/server/ai/generate-object';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import { METRIC_NAME_MAX_LENGTH } from '@/server/metrics/constants/definition/metric-limits';
import { quickMetricMock } from '@/server/metrics/generation/mocks/quick-metric-mock';
import { judgeCode } from '@/server/metrics/generation/utils/judge-code';
import { startPatternReview } from '@/server/metrics/pattern-reviews/start-pattern-review';
import { startQuickMetricBuildSchema } from '@/server/metrics/schemas';
import { createMetricRecord } from '@/server/metrics/utils/records/create-metric-record';
import { filterProjectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const draftSchema = z.object({
  name: z.string().min(1).max(METRIC_NAME_MAX_LENGTH),
  refinedDescription: z.string().min(1),
  evalType: z.enum(MetricEvalType),
  summary: z.string(),
  resolvedEdgeCases: z.array(z.string()),
});

const SYSTEM_PROMPT = [
  'You turn a plain-language request into an evaluation metric for a voice AI agent.',
  'The agent under test is the "Main Agent". The simulated caller is the "Testing Agent".',
  'If the request names the metric, use that name exactly. Else write a short title case name.',
  'Write refinedDescription as precise PASS and FAIL rules for an LLM judge.',
  'List the edge cases that you resolved.',
].join('\n');

export const startQuickMetricBuild = withValidation(
  startQuickMetricBuildSchema,
  async ({ projectId, agentIds, description }) => {
    const { user } = await requireProjectAccess(projectId);
    const validAgentIds = await filterProjectAgentIds(
      prisma,
      projectId,
      agentIds,
    );
    if (validAgentIds.length === 0) {
      throw new ActionError('Select at least one agent of this project.');
    }
    const contextAgent = await prisma.agent.findUniqueOrThrow({
      where: { id: validAgentIds[0] },
      select: { name: true, description: true },
    });
    addEventFields({
      project: { id: projectId },
      agents: { count: validAgentIds.length },
    });
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.metric_generation,
      input: { agentIds: validAgentIds, description },
      initialStep: 'Reasoning about the metric...',
      run: async (context) => {
        const draft = await generateObject({
          system: SYSTEM_PROMPT,
          prompt: `Agent: ${contextAgent.name}\nAgent description:\n${contextAgent.description}\n\nRequest:\n${description}`,
          schema: draftSchema,
          mock: () => quickMetricMock(description),
        });
        await context.setStep('Checking the metric...');
        const metric = await prisma.$transaction((tx) =>
          createMetricRecord(tx, {
            projectId,
            userId: user.id,
            type: MetricType.custom_code,
            name: draft.name,
            slug: null,
            evalType: draft.evalType,
            description,
            customCode: judgeCode(draft.refinedDescription, draft.evalType),
            agentIds: validAgentIds,
          }),
        );
        await startPatternReview({
          metricId: metric.id,
          projectId,
          userId: user.id,
        });
        await context.setStep('Metric created');
        await context.setResult({
          summary: `Metric created: ${metric.name}`,
          deepLink: UrlGenerator.metricEdit({
            metricId: metric.id,
            values: { project: projectId },
          }),
          metricId: metric.id,
          resolvedEdgeCases: draft.resolvedEdgeCases,
        });
      },
    });
  },
);
