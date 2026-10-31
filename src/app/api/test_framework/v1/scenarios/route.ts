import { TriggerType } from '@/lib/logging/constants';
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
import { createPublicScenario } from '@/server/evaluators/public-api/create-public-scenario';
import { listPublicScenarios } from '@/server/evaluators/public-api/list-public-scenarios';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/scenarios`;

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_scenarios,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicScenarios({ auth, request })),
    ),
  ),
);

export const POST = withRouteEvent(
  {
    operation: RouteOperation.create_scenario,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await createPublicScenario({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
