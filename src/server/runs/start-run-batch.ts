import 'server-only';

import { CallerNumberMode, ResultSource } from '@/generated/prisma/enums';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { createRunBatch } from '@/server/runs/create-run-batch';
import { startRunSchema } from '@/server/runs/schemas';

const callerNumberModeOf = (randomize: boolean) => {
  if (randomize) return CallerNumberMode.different_numbers;
  return CallerNumberMode.same_number;
};

export const startRunBatch = withValidation(startRunSchema, async (input) => {
  const { user } = await requireProjectAccess(input.projectId);
  return createRunBatch({
    projectId: input.projectId,
    createdById: user.id,
    agentId: input.agentId,
    evaluatorIds: input.evaluatorIds,
    personalityIds: input.personalityIds,
    testProfileIds: input.testProfileIds,
    frequency: input.frequency,
    source: ResultSource.user,
    name: input.name,
    callsPerSecond: input.callsPerSecond,
    concurrencyLimit: input.concurrencyLimit,
    callerNumberMode: callerNumberModeOf(input.randomize),
    agentNumber: input.agentNumber,
    mockToolIds: input.mockToolIds,
  });
});
