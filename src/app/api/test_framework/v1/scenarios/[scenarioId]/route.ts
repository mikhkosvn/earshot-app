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
import { deletePublicScenario } from '@/server/evaluators/public-api/delete-public-scenario';
import { getPublicScenario } from '@/server/evaluators/public-api/get-public-scenario';

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/scenarios/[scenarioId]`;

interface ScenarioParams {
  scenarioId: string;
}

export const GET = withRouteEvent(
  {
    operation: RouteOperation.get_scenario,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey<ScenarioParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await getPublicScenario({
          auth,
          scenarioId: readRecordId(params.scenarioId),
        }),
      ),
    ),
  ),
);

export const DELETE = withRouteEvent(
  {
    operation: RouteOperation.delete_scenario,
    trigger: TriggerType.programmatic,
    method: HttpMethod.delete,
    route: ROUTE,
  },
  withApiKey<ScenarioParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () => {
      await deletePublicScenario({
        auth,
        scenarioId: readRecordId(params.scenarioId),
      });
      return noContentResponse();
    }),
  ),
);
