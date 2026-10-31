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
import { createPublicTestProfile } from '@/server/test-profiles/public-api/create-public-test-profile';
import { listPublicTestProfiles } from '@/server/test-profiles/public-api/list-public-test-profiles';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/test-profiles`;

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_test_profiles,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicTestProfiles({ auth, request })),
    ),
  ),
);

export const POST = withRouteEvent(
  {
    operation: RouteOperation.create_test_profile,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await createPublicTestProfile({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
