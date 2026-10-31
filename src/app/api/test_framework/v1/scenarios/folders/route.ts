import { TriggerType } from '@/lib/logging/constants';
import { listPublicFolders } from '@/server/folders/public-api/list-public-folders';
import {
  HttpMethod,
  RouteOperation,
  TEST_FRAMEWORK_ROUTE_PREFIX,
} from '@/server/public-api/constants';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withPublicErrors } from '@/server/public-api/with-public-errors';
import { withRouteEvent } from '@/server/public-api/with-route-event';

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_folders,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: `${TEST_FRAMEWORK_ROUTE_PREFIX}/scenarios/folders/`,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicFolders({ auth, request })),
    ),
  ),
);
