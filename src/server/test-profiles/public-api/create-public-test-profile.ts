import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { throwFieldErrors } from '@/server/evaluators/public-api/utils/field-errors';
import { resolveProjectId } from '@/server/public-api/project-scope';
import { readJsonBody } from '@/server/public-api/read-json-body';
import { createPublicTestProfileSchema } from '@/server/test-profiles/public-api/schemas';
import {
  publicTestProfileSelect,
  toPublicTestProfile,
} from '@/server/test-profiles/public-api/utils/public-test-profile';
import { generatedTestProfileName } from '@/server/test-profiles/utils/test-profile-names';
import { toVariableRows } from '@/server/test-profiles/utils/variable-rows';

const toVariables = (variables: Record<string, string> | undefined) =>
  Object.entries(variables ?? {}).map(([key, value]) => ({ key, value }));

const assertAgent = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
) => {
  const agent = await tx.agent.findFirst({
    where: { id: agentId, projectId },
    select: { id: true },
  });
  if (agent) return;
  throwFieldErrors([
    {
      field: 'agent',
      message: `Agent with id ${agentId} not found in this project`,
    },
  ]);
};

export const createPublicTestProfile = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = createPublicTestProfileSchema.parse(await readJsonBody(request));
  const projectId = await resolveProjectId(auth, body.project);
  const mainAgentVariables = toVariables(
    body.information?.main_agent_variables,
  );
  const testingAgentVariables = toVariables(
    body.information?.testing_agent_variables,
  );
  const row = await prisma.$transaction(async (tx) => {
    await assertAgent(tx, projectId, body.agent);
    return tx.testProfile.create({
      data: {
        projectId,
        agentId: body.agent,
        name: body.name || generatedTestProfileName(body.agent),
        variables: {
          create: toVariableRows(mainAgentVariables, testingAgentVariables),
        },
      },
      select: publicTestProfileSelect,
    });
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    agent: { id: body.agent },
    test_profile: {
      id: row.id,
      variable_count: mainAgentVariables.length + testingAgentVariables.length,
    },
  });
  return toPublicTestProfile(row);
};
