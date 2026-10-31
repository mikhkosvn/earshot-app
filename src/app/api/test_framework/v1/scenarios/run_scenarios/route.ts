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
import { runPublicScenarios } from '@/server/runs/public-api/run-public-scenarios';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/scenarios/run_scenarios`;

export const POST = withRouteEvent(
  {
    operation: RouteOperation.run_scenarios,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await runPublicScenarios({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
