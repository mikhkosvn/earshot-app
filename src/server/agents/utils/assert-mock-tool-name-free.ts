import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';

interface AssertMockToolNameFreeArgs {
  agentId: number;
  name: string;
  mockToolId?: number;
}

export const assertMockToolNameFree = async ({
  agentId,
  name,
  mockToolId,
}: AssertMockToolNameFreeArgs) => {
  const existing = await prisma.mockTool.findFirst({
    where: { agentId, name, ...(mockToolId && { id: { not: mockToolId } }) },
    select: { id: true },
  });
  if (existing) {
    throw new ActionError(`A mock tool with the name "${name}" exists.`, 409);
  }
};
