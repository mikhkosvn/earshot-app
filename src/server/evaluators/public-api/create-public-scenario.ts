import 'server-only';

import { CreationMethod } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { createPublicScenarioSchema } from '@/server/evaluators/public-api/schemas';
import {
  publicScenarioSelect,
  toPublicScenario,
} from '@/server/evaluators/public-api/utils/public-scenario';
import { validateScenarioReferences } from '@/server/evaluators/public-api/utils/validate-scenario-references';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { createEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';
import { resolveProjectId } from '@/server/public-api/project-scope';
import { readJsonBody } from '@/server/public-api/read-json-body';

const textOrNull = (text: string) => {
  if (!text) return null;
  return text;
};

export const createPublicScenario = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = createPublicScenarioSchema.parse(await readJsonBody(request));
  const projectId = await resolveProjectId(auth, body.project);
  const row = await prisma.$transaction(async (tx) => {
    const { personalityId, tools } = await validateScenarioReferences(
      tx,
      projectId,
      body,
    );
    const created = await createEvaluatorRecord(tx, {
      projectId,
      userId: null,
      creationMethod: CreationMethod.json_spec,
      fields: {
        agentId: body.agent,
        name: body.name,
        folderPath: body.folder_path,
        tags: body.tags,
        scenarioType: body.scenario_type,
        testProfileId: body.test_profile ?? null,
        firstMessage: body.first_message,
        instructions: body.instructions,
        personalityId,
        language: body.scenario_language,
        expectedOutcomePrompt: body.expected_outcome_prompt,
        metricIds: body.metrics,
        expectedToolCalls: [],
        phoneNumberId: null,
        tools,
        maxDurationSeconds: body.max_duration ?? null,
      },
    });
    await tx.evaluator.update({
      where: { id: created.id },
      data: {
        firstMessage: textOrNull(body.first_message),
        simulationDescription: textOrNull(body.simulation_description),
      },
    });
    await recordEvaluatorVersion(tx, {
      evaluatorId: created.id,
      userId: null,
    });
    return tx.evaluator.findUniqueOrThrow({
      where: { id: created.id },
      select: publicScenarioSelect,
    });
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    agent: { id: body.agent },
    evaluator: {
      id: row.id,
      creation_method: CreationMethod.json_spec,
      scenario_type: row.scenarioType,
      metric_count: row.metrics.length,
      tag_count: row.tags.length,
      tool_count: row.tools.length,
    },
  });
  return toPublicScenario(row);
};
