import { TriggerType } from '@/lib/logging/constants';
import {
  HttpMethod,
  RouteOperation,
  TEST_FRAMEWORK_ROUTE_PREFIX,
} from '@/server/public-api/constants';
import { jsonResponse } from '@/server/public-api/json-response';
import { noContentResponse } from '@/server/public-api/no-content-response';
import { readRecordId } from '@/server/public-api/read-record-id';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withPublicErrors } from '@/server/public-api/with-public-errors';
import { withRouteEvent } from '@/server/public-api/with-route-event';
import { deletePublicTestProfile } from '@/server/test-profiles/public-api/delete-public-test-profile';
import { getPublicTestProfile } from '@/server/test-profiles/public-api/get-public-test-profile';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/test-profiles/[testProfileId]`;

interface TestProfileParams {
  testProfileId: string;
}

export const GET = withRouteEvent(
  {
    operation: RouteOperation.get_test_profile,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey<TestProfileParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await getPublicTestProfile({
          auth,
          testProfileId: readRecordId(params.testProfileId),
        }),
      ),
    ),
  ),
);

export const DELETE = withRouteEvent(
  {
    operation: RouteOperation.delete_test_profile,
    trigger: TriggerType.programmatic,
    method: HttpMethod.delete,
    route: ROUTE,
  },
  withApiKey<TestProfileParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () => {
      await deletePublicTestProfile({
        auth,
        testProfileId: readRecordId(params.testProfileId),
      });
      return noContentResponse();
    }),
  ),
);
