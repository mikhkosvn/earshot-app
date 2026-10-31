import { TriggerType } from '@/lib/logging/constants';
import { createPublicMetric } from '@/server/metrics/public-api/create-public-metric';
import { listPublicMetrics } from '@/server/metrics/public-api/list-public-metrics';
import {
  HttpMethod,
  RouteOperation,
  STATUS_CODE_CREATED,
  TEST_FRAMEWORK_ROUTE_PREFIX,
} from '@/server/public-api/constants';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withPublicErrors } from '@/server/public-api/with-public-errors';
import { withRouteEvent } from '@/server/public-api/with-route-event';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/metrics`;

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_metrics,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicMetrics({ auth, request })),
    ),
  ),
);

export const POST = withRouteEvent(
  {
    operation: RouteOperation.create_metric,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await createPublicMetric({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
