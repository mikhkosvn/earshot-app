import { TriggerType } from '@/lib/logging/constants';
import {
  HttpMethod,
  RouteOperation,
  TEST_FRAMEWORK_ROUTE_PREFIX,
} from '@/server/public-api/constants';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withPublicErrors } from '@/server/public-api/with-public-errors';
import { withRouteEvent } from '@/server/public-api/with-route-event';
import { listPublicRunsBulk } from '@/server/runs/public-api/list-public-runs-bulk';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/runs/bulk`;

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_runs_bulk,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicRunsBulk({ auth, request })),
    ),
  ),
);
