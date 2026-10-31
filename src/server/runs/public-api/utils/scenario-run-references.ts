import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { ActionError } from '@/server/common/run-action';
import {
  type FieldIssue,
  throwFieldErrors,
} from '@/server/evaluators/public-api/utils/field-errors';
import { resolvePersonalityIds } from '@/server/personalities/public-api/public-personality-id';
import {
  NOT_FOUND_DETAIL,
  STATUS_CODE_NOT_FOUND,
} from '@/server/public-api/constants';

interface ScopedAgent {
  id: number;
  projectId: number;
  mockTools: { id: number; name: string }[];
}

export const loadScopedAgent = async (
  auth: ApiKeyAuth,
  agentId: number,
  projectId: number | null | undefined,
): Promise<ScopedAgent> => {
  const agent = await prisma.agent.findUniqueOrThrow({
    where: {
      id: agentId,
      project: { organizationId: auth.organizationId },
      ...(auth.projectId !== null && { projectId: auth.projectId }),
    },
    select: {
      id: true,
      projectId: true,
      mockTools: { select: { id: true, name: true } },
    },
  });
  if (projectId && projectId !== agent.projectId) {
    throw new ActionError(NOT_FOUND_DETAIL, STATUS_CODE_NOT_FOUND);
  }
  return agent;
};

export const mockToolIdsOf = (
  agent: ScopedAgent,
  names: string[] | null | undefined,
) => {
  if (names === null || names === undefined) return null;
  const byName = new Map(agent.mockTools.map((tool) => [tool.name, tool.id]));
  const issues: FieldIssue[] = names
    .filter((name) => !byName.has(name))
    .map((name) => ({
      field: 'mock_tool_names',
      message: `Mock tool '${name}' does not exist.`,
    }));
  throwFieldErrors(issues);
  return names.flatMap((name) => {
    const id = byName.get(name);
    if (id === undefined) return [];
    return [id];
  });
};

export const personalityIdsOf = async (
  projectId: number,
  publicIds: number[] | null | undefined,
) => {
  if (!publicIds) return null;
  const resolved = await resolvePersonalityIds(projectId, publicIds);
  throwFieldErrors(
    publicIds
      .filter((publicId) => !resolved.has(publicId))
      .map((publicId) => ({
        field: 'personality_ids',
        message: `Personality '${publicId}' does not exist.`,
      })),
  );
  return publicIds.flatMap((publicId) => {
    const id = resolved.get(publicId);
    if (id === undefined) return [];
    return [id];
  });
};
