import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listScenarioOptionsAction } from '@/server/metrics/actions';

export const CreateMetricKey = {
  scenarioOptions: 'metric-scenario-options',
  create: 'create-metric',
  quickBuild: 'start-quick-metric-build',
} as const;

export type CreateMetricKey =
  (typeof CreateMetricKey)[keyof typeof CreateMetricKey];

export class CreateMetricService {
  static readonly createMutationKey = [CreateMetricKey.create];
  static readonly quickBuildMutationKey = [CreateMetricKey.quickBuild];

  static getScenarioOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [CreateMetricKey.scenarioOptions, projectId],
      queryFn: () =>
        deferAction(() => listScenarioOptionsAction({ projectId })),
    });
  }
}
