import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { defaultTestProfileName } from '@/server/test-profiles/utils/test-profile-names';
import { toVariableRows } from '@/server/test-profiles/utils/variable-rows';

const DEFAULT_PERSONA_VARIABLES = [
  { key: 'full_name', value: 'Sarah Mitchell' },
  { key: 'first_name', value: 'Sarah' },
  { key: 'last_name', value: 'Mitchell' },
  { key: 'date_of_birth', value: '1988-06-15' },
  { key: 'phone_number', value: '555-014-2233' },
  { key: 'email_address', value: 'sarah.mitchell@example.com' },
  { key: 'street_address', value: '482 Oakwood Drive' },
  { key: 'city', value: 'Springfield' },
  { key: 'zip_code', value: '62704' },
];

export const ensureDefaultTestProfile = async (
  tx: Prisma.TransactionClient,
  agentId: number,
) => {
  const agent = await tx.agent.findUniqueOrThrow({
    where: { id: agentId },
    select: {
      id: true,
      name: true,
      projectId: true,
      defaultTestProfileId: true,
    },
  });
  if (agent.defaultTestProfileId) return agent.defaultTestProfileId;
  const profile = await tx.testProfile.create({
    data: {
      projectId: agent.projectId,
      agentId: agent.id,
      name: defaultTestProfileName(agent),
      variables: { create: toVariableRows([], DEFAULT_PERSONA_VARIABLES) },
    },
    select: { id: true },
  });
  await tx.agent.update({
    where: { id: agent.id },
    data: { defaultTestProfileId: profile.id },
  });
  return profile.id;
};
