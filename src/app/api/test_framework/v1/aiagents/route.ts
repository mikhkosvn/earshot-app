import { TriggerType } from '@/lib/logging/constants';
import { createPublicAgent } from '@/server/agents/public-api/create-public-agent';
import { listPublicAgents } from '@/server/agents/public-api/list-public-agents';
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

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/aiagents/`;

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_agents,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(await listPublicAgents({ auth, request })),
    ),
  ),
);

export const POST = withRouteEvent(
  {
    operation: RouteOperation.create_agent,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: ROUTE,
  },
  withApiKey(async (request, { auth }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await createPublicAgent({ auth, request }),
        STATUS_CODE_CREATED,
      ),
    ),
  ),
);
