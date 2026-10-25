import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listOptimizerSchedulesAction } from '@/server/metric-optimizer/actions';

export const OptimizerScheduleKey = {
  list: 'optimizer-schedules',
  create: 'create-optimizer-schedule',
  update: 'update-optimizer-schedule',
  delete: 'delete-optimizer-schedule',
} as const;

export type OptimizerScheduleKey =
  (typeof OptimizerScheduleKey)[keyof typeof OptimizerScheduleKey];

export class OptimizerScheduleService {
  static readonly listKey = [OptimizerScheduleKey.list];
  static readonly createMutationKey = [OptimizerScheduleKey.create];
  static readonly updateMutationKey = [OptimizerScheduleKey.update];
  static readonly deleteMutationKey = [OptimizerScheduleKey.delete];

  static getListQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [OptimizerScheduleKey.list, projectId],
      queryFn: () =>
        deferAction(() => listOptimizerSchedulesAction({ projectId })),
    });
  }
}
