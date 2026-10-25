import { queryOptions } from '@tanstack/react-query';

import {
  getMetricAction,
  listMetricVersionsAction,
} from '@/server/metrics/actions';

export const EditMetricKey = {
  detail: 'metric-detail',
  versions: 'metric-versions',
  update: 'update-metric',
} as const;

export type EditMetricKey = (typeof EditMetricKey)[keyof typeof EditMetricKey];

export class EditMetricService {
  static readonly updateMutationKey = [EditMetricKey.update];

  static getMetricQuery({ metricId }: { metricId: number }) {
    return queryOptions({
      queryKey: [EditMetricKey.detail, metricId],
      queryFn: () => getMetricAction({ metricId }),
    });
  }

  static getVersionsQuery({ metricId }: { metricId: number }) {
    return queryOptions({
      queryKey: [EditMetricKey.versions, metricId],
      queryFn: () => listMetricVersionsAction({ metricId }),
    });
  }
}
