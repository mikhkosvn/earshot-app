import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { CallEvaluationStatus } from '@/generated/prisma/enums';
import { ResultRunType } from '@/server/results/constants/result-list';
import type { ResultListRow } from '@/server/results/types';
import { toAgentRef } from '@/server/results/utils/refs';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

export const resultRowSelect = {
  id: true,
  name: true,
  status: true,
  createdAt: true,
  agent: { select: { id: true, name: true } },
  agentVersion: { select: { version: true } },
  runs: {
    select: { evaluatorId: true, status: true, evaluationStatus: true },
  },
} satisfies Prisma.ResultSelect;

type ResultRowRecord = Prisma.ResultGetPayload<{
  select: typeof resultRowSelect;
}>;

const PASSED_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.success,
  CallEvaluationStatus.reviewed_success,
];

export const isPassedEvaluation = (status: CallEvaluationStatus | null) =>
  status !== null && PASSED_STATUSES.includes(status);

export const successRateOf = (
  runs: { evaluationStatus: CallEvaluationStatus | null }[],
) => {
  if (runs.length === 0) return null;
  const passed = runs.filter((run) => isPassedEvaluation(run.evaluationStatus));
  return (passed.length / runs.length) * 100;
};

export const toResultListRow = (row: ResultRowRecord): ResultListRow => ({
  id: row.id,
  name: row.name,
  evaluatorCount: new Set(
    row.runs.flatMap((run) => {
      if (run.evaluatorId === null) return [];
      return [run.evaluatorId];
    }),
  ).size,
  totalRuns: row.runs.length,
  completedRuns: row.runs.filter((run) => isTerminalRunStatus(run.status))
    .length,
  agent: toAgentRef(row.agent, row.agentVersion),
  runType: ResultRunType.telephony,
  status: row.status,
  successRate: successRateOf(row.runs),
  createdAt: row.createdAt,
});
