import 'server-only';

import { CallerNumberMode } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';
import {
  RUN_BATCH_MAX_RUNS,
  RUN_FREQUENCY_MIN,
} from '@/server/runs/constants/run-limits';
import { RunMessage } from '@/server/runs/constants/run-messages';
import type { CreateRunBatchArgs, CreatedRunBatch } from '@/server/runs/types';
import {
  evaluatorSnapshotSelect,
  toEvaluatorSnapshot,
} from '@/server/runs/utils/evaluator-snapshot';
import {
  countPlannedRuns,
  expandRunPlan,
  type RunPlanSource,
} from '@/server/runs/utils/expand-run-plan';
import { insertRunBatch } from '@/server/runs/utils/insert-run-batch';
import {
  assertPersonalitiesEnabled,
  assertTestProfilesOfAgent,
  loadRunAgent,
  resolveAgentNumber,
  resolveMockToolIds,
} from '@/server/runs/utils/run-references';

const loadEvaluators = async (projectId: number, evaluatorIds: number[]) => {
  const unique = [...new Set(evaluatorIds)];
  if (unique.length === 0) throw new ActionError(RunMessage.noEvaluators);
  const rows = await prisma.evaluator.findMany({
    where: { id: { in: unique }, projectId },
    select: evaluatorSnapshotSelect,
  });
  if (rows.length !== unique.length) {
    throw new ActionError(RunMessage.evaluatorMissing, 404);
  }
  const byId = new Map(rows.map((row) => [row.id, row]));
  return unique.flatMap((id) => {
    const row = byId.get(id);
    if (!row) return [];
    return [row];
  });
};

export const createRunBatch = async (
  args: CreateRunBatchArgs,
): Promise<CreatedRunBatch> => {
  const agent = await loadRunAgent(args.projectId, args.agentId);
  const agentNumber = resolveAgentNumber(args.agentNumber, agent.phoneNumber);
  const evaluators = await loadEvaluators(args.projectId, args.evaluatorIds);
  const personalityIds = [...new Set(args.personalityIds ?? [])];
  const testProfileIds = [...new Set(args.testProfileIds ?? [])];
  await assertPersonalitiesEnabled(args.projectId, personalityIds);
  await assertTestProfilesOfAgent(args.projectId, agent.id, testProfileIds);
  const mockToolIds = resolveMockToolIds(agent, args.mockToolIds);
  const frequency = Math.max(RUN_FREQUENCY_MIN, args.frequency ?? 1);

  const sources: RunPlanSource[] = evaluators.map((row) => ({
    evaluatorId: row.id,
    evaluatorSnapshot: toEvaluatorSnapshot(row),
    personalityId: row.personalityId,
    testProfileId: row.testProfileId ?? agent.defaultTestProfileId,
    frequency,
  }));
  const plan = { sources, personalityIds, testProfileIds };
  if (countPlannedRuns(plan) > RUN_BATCH_MAX_RUNS) {
    throw new ActionError(RunMessage.tooManyRuns);
  }

  return insertRunBatch(
    {
      projectId: args.projectId,
      createdById: args.createdById,
      agentId: agent.id,
      source: args.source,
      name: args.name?.trim() ?? '',
      frequency,
      callsPerSecond: args.callsPerSecond ?? null,
      concurrencyLimit: args.concurrencyLimit ?? null,
      callerNumberMode: args.callerNumberMode ?? CallerNumberMode.same_number,
      agentNumber,
      mockToolIds,
      monitorRunId: args.monitorRunId ?? null,
      apiKeyId: args.apiKeyId ?? null,
    },
    expandRunPlan(plan),
  );
};
