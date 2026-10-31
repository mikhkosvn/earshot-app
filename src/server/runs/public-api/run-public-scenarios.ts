import 'server-only';

import { ResultSource } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { readJsonBody } from '@/server/public-api/read-json-body';
import { createRunBatch } from '@/server/runs/create-run-batch';
import { runPublicScenariosSchema } from '@/server/runs/public-api/schemas';
import {
  publicRunBatchSelect,
  toPublicRunBatch,
} from '@/server/runs/public-api/utils/public-run-batch';
import {
  loadScopedAgent,
  mockToolIdsOf,
  personalityIdsOf,
} from '@/server/runs/public-api/utils/scenario-run-references';

export const runPublicScenarios = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = runPublicScenariosSchema.parse(await readJsonBody(request));
  const agent = await loadScopedAgent(auth, body.agent_id, body.project_id);
  const mockToolIds = mockToolIdsOf(agent, body.mock_tool_names);
  const personalityIds = await personalityIdsOf(
    agent.projectId,
    body.personality_ids,
  );
  addEventFields({
    organization: { id: auth.organizationId },
    api_key: { id: auth.apiKeyId },
    run_request: {
      scenario_count: body.scenarios.length,
      mock_tool_count: mockToolIds?.length ?? null,
      personality_count: personalityIds?.length ?? null,
    },
  });
  const batch = await createRunBatch({
    projectId: agent.projectId,
    createdById: null,
    agentId: agent.id,
    evaluatorIds: body.scenarios,
    personalityIds,
    testProfileIds: body.test_profile_ids ?? null,
    frequency: body.frequency ?? undefined,
    source: ResultSource.api,
    name: body.name ?? undefined,
    callsPerSecond: body.calls_per_second ?? null,
    concurrencyLimit: body.concurrency_limit ?? null,
    callerNumberMode: body.mode ?? undefined,
    agentNumber: body.agent_number ?? null,
    mockToolIds,
    apiKeyId: auth.apiKeyId,
  });
  const result = await prisma.result.findUniqueOrThrow({
    where: { id: batch.resultId },
    select: publicRunBatchSelect,
  });
  return toPublicRunBatch(result);
};
