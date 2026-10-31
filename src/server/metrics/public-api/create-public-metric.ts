import 'server-only';

import type { z } from 'zod';

import type { Prisma } from '@/generated/prisma/client';
import { MetricType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { createPublicMetricSchema } from '@/server/metrics/public-api/schemas';
import {
  publicMetricSelect,
  toPublicMetric,
} from '@/server/metrics/public-api/utils/public-metric';
import { createMetricRecord } from '@/server/metrics/utils/records/create-metric-record';
import {
  filterProjectAgentIds,
  projectAgentIds,
} from '@/server/metrics/utils/records/project-agent-ids';
import { resolveProjectId } from '@/server/public-api/project-scope';
import { readJsonBody } from '@/server/public-api/read-json-body';

type CreatePublicMetricBody = z.output<typeof createPublicMetricSchema>;

const settingsOf = (body: CreatePublicMetricBody) =>
  ({
    displayOrder: body.display_order ?? undefined,
    observabilityEnabled: body.observability_enabled ?? undefined,
    simulationEnabled: body.simulation_enabled ?? undefined,
    samplingEnabled: body.sampling_enabled ?? undefined,
  }) satisfies Prisma.MetricUpdateInput;

export const createPublicMetric = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = createPublicMetricSchema.parse(await readJsonBody(request));
  const projectId = await resolveProjectId(auth, body.project);
  const type = body.type ?? MetricType.llm_judge;
  const { row, agentIds } = await prisma.$transaction(async (tx) => {
    const created = await createMetricRecord(tx, {
      projectId,
      userId: null,
      type,
      name: body.name,
      slug: null,
      evalType: body.eval_type,
      enumValues: body.enum_values ?? undefined,
      audioEnabled: body.audio_enabled ?? undefined,
      description: body.description ?? undefined,
      customCode: body.custom_code ?? undefined,
      configuration: body.configuration ?? null,
      evaluationTrigger: body.evaluation_trigger ?? undefined,
      triggerType: body.trigger_type ?? undefined,
      evaluationTriggerPrompt: body.evaluation_trigger_prompt ?? undefined,
      evaluationTriggerCustomCode:
        body.evaluation_trigger_custom_code ?? undefined,
      addToNewAgents: body.add_to_new_agents ?? undefined,
      agentIds: await filterProjectAgentIds(tx, projectId, body.agents ?? []),
    });
    return {
      row: await tx.metric.update({
        where: { id: created.id },
        data: settingsOf(body),
        select: publicMetricSelect,
      }),
      agentIds: await projectAgentIds(tx, projectId),
    };
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    metric: {
      id: row.id,
      kind: type,
      eval_type: body.eval_type,
      agent_count: row.agents.length,
    },
  });
  return toPublicMetric(row, agentIds);
};
