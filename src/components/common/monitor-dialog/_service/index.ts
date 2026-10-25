import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listPersonalityOptionsAction } from '@/server/evaluators/actions';
import {
  getMonitorAction,
  listMonitorAgentOptionsAction,
  listMonitorRunsAction,
  listMonitorsAction,
  listMonitorScenariosAction,
} from '@/server/monitors/actions';
import type { ListMonitorsInput } from '@/server/monitors/types';

export const MonitorKey = {
  list: 'monitor-list',
  detail: 'monitor-detail',
  runs: 'monitor-runs',
  agentOptions: 'monitor-agent-options',
  scenarios: 'monitor-scenarios',
  personalityOptions: 'monitor-personality-options',
  create: 'monitor-create',
  update: 'monitor-update',
  setActive: 'monitor-set-active',
  delete: 'monitor-delete',
} as const;

export type MonitorKey = (typeof MonitorKey)[keyof typeof MonitorKey];

export class MonitorService {
  static readonly listKey = [MonitorKey.list];
  static readonly detailKey = [MonitorKey.detail];
  static readonly runsKey = [MonitorKey.runs];
  static readonly createMutationKey = [MonitorKey.create];
  static readonly updateMutationKey = [MonitorKey.update];
  static readonly setActiveMutationKey = [MonitorKey.setActive];
  static readonly deleteMutationKey = [MonitorKey.delete];

  static getListQuery(args: ListMonitorsInput) {
    return queryOptions({
      queryKey: [MonitorKey.list, args],
      queryFn: () => deferAction(() => listMonitorsAction(args)),
    });
  }

  static getMonitorQuery(args: { monitorId: number }) {
    return queryOptions({
      queryKey: [MonitorKey.detail, args],
      queryFn: () => deferAction(() => getMonitorAction(args)),
    });
  }

  static getRunsQuery(args: { monitorId: number }) {
    return queryOptions({
      queryKey: [MonitorKey.runs, args],
      queryFn: () => deferAction(() => listMonitorRunsAction(args)),
    });
  }

  static getAgentOptionsQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [MonitorKey.agentOptions, args],
      queryFn: () => deferAction(() => listMonitorAgentOptionsAction(args)),
    });
  }

  static getScenariosQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [MonitorKey.scenarios, args],
      queryFn: () => deferAction(() => listMonitorScenariosAction(args)),
    });
  }

  static getPersonalityOptionsQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [MonitorKey.personalityOptions, args],
      queryFn: () => deferAction(() => listPersonalityOptionsAction(args)),
    });
  }
}
