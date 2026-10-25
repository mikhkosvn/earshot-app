import { queryOptions } from '@tanstack/react-query';

import { RunStatus } from '@/generated/prisma/enums';
import { deferAction } from '@/lib/query-client/defer-action';
import {
  listAgentOptionsAction,
  listPersonalityOptionsAction,
} from '@/server/evaluators/actions';
import { RUN_STATUS_POLL_INTERVAL_MS } from '@/server/runs/constants/run-limits';
import {
  getRunAgentConfigurationAction,
  getRunBatchStatusAction,
  getRunDefaultsAction,
} from '@/server/runs/actions';
import type { RunBatchStatus } from '@/server/runs/types';
import { listTestProfilesAction } from '@/server/test-profiles/actions';

export const RunDialogKey = {
  defaults: 'run-defaults',
  agentConfiguration: 'run-agent-configuration',
  agents: 'run-agent-options',
  personalities: 'run-personality-options',
  testProfiles: 'run-test-profile-options',
  batchStatus: 'run-batch-status',
  startRun: 'start-run',
  checkTestSuite: 'check-test-suite',
  runTestSuite: 'run-test-suite',
  cancelResult: 'cancel-result',
} as const;

export type RunDialogKey = (typeof RunDialogKey)[keyof typeof RunDialogKey];

const FINISHED_RESULT_STATUSES: RunStatus[] = [
  RunStatus.completed,
  RunStatus.failed,
  RunStatus.timeout,
  RunStatus.cancelled,
];

const batchStatusInterval = (status: RunBatchStatus | undefined) => {
  if (status && FINISHED_RESULT_STATUSES.includes(status.status)) return false;
  return RUN_STATUS_POLL_INTERVAL_MS;
};

const agentConfiguration = (args: {
  projectId: number;
  agentId: number | null;
  evaluatorIds: number[];
}) => {
  if (args.agentId === null) return Promise.resolve(null);
  const agentId = args.agentId;
  return deferAction(() =>
    getRunAgentConfigurationAction({ ...args, agentId }),
  );
};

type ProjectArgs = { projectId: number };

export class RunDialogService {
  static readonly startRunMutationKey = [RunDialogKey.startRun];
  static readonly checkTestSuiteMutationKey = [RunDialogKey.checkTestSuite];
  static readonly runTestSuiteMutationKey = [RunDialogKey.runTestSuite];
  static readonly cancelResultMutationKey = [RunDialogKey.cancelResult];

  static getDefaultsQuery(args: { projectId: number; evaluatorIds: number[] }) {
    return queryOptions({
      queryKey: [RunDialogKey.defaults, args],
      queryFn: () => deferAction(() => getRunDefaultsAction(args)),
      staleTime: 0,
    });
  }

  static getAgentConfigurationQuery(args: {
    projectId: number;
    agentId: number | null;
    evaluatorIds: number[];
  }) {
    return queryOptions({
      queryKey: [RunDialogKey.agentConfiguration, args],
      queryFn: () => agentConfiguration(args),
      staleTime: 0,
    });
  }

  static getAgentsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [RunDialogKey.agents, args],
      queryFn: () => deferAction(() => listAgentOptionsAction(args)),
    });
  }

  static getPersonalitiesQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [RunDialogKey.personalities, args],
      queryFn: () => deferAction(() => listPersonalityOptionsAction(args)),
    });
  }

  static getTestProfilesQuery(args: { projectId: number; agentId: number }) {
    return queryOptions({
      queryKey: [RunDialogKey.testProfiles, args],
      queryFn: () => deferAction(() => listTestProfilesAction(args)),
    });
  }

  static getBatchStatusQuery(args: { resultId: number }) {
    return queryOptions({
      queryKey: [RunDialogKey.batchStatus, args],
      queryFn: () => deferAction(() => getRunBatchStatusAction(args)),
      staleTime: 0,
      refetchInterval: (query) => batchStatusInterval(query.state.data),
    });
  }
}
