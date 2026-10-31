import { TriggerType } from '@/lib/logging/constants';
import { deletePublicMetric } from '@/server/metrics/public-api/delete-public-metric';
import {
  HttpMethod,
  RouteOperation,
  TEST_FRAMEWORK_ROUTE_PREFIX,
} from '@/server/public-api/constants';
import { noContentResponse } from '@/server/public-api/no-content-response';
import { readRecordId } from '@/server/public-api/read-record-id';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withPublicErrors } from '@/server/public-api/with-public-errors';
import { withRouteEvent } from '@/server/public-api/with-route-event';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/metrics/[metricId]`;

interface MetricParams {
  metricId: string;
}

export const DELETE = withRouteEvent(
  {
    operation: RouteOperation.delete_metric,
    trigger: TriggerType.programmatic,
    method: HttpMethod.delete,
    route: ROUTE,
  },
  withApiKey<MetricParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () => {
      await deletePublicMetric({
        auth,
        metricId: readRecordId(params.metricId),
      });
      return noContentResponse();
    }),
  ),
);
