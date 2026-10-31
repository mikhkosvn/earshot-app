import { TriggerType } from '@/lib/logging/constants';
import { createPublicFolder } from '@/server/folders/public-api/create-public-folder';
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

export const POST = withRouteEvent(
  {
    operation: RouteOperation.create_folder,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: `${TEST_FRAMEWORK_ROUTE_PREFIX}/scenarios/create_folder/`,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await createPublicFolder({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
