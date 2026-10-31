import { TriggerType } from '@/lib/logging/constants';
import { deletePublicAgent } from '@/server/agents/public-api/delete-public-agent';
import { getPublicAgent } from '@/server/agents/public-api/get-public-agent';
import { updatePublicAgent } from '@/server/agents/public-api/update-public-agent';
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

const ROUTE = `${TEST_FRAMEWORK_ROUTE_PREFIX}/aiagents/[id]/`;

interface AgentRouteParams {
  id: string;
}

export const GET = withRouteEvent(
  {
    operation: RouteOperation.get_agent,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: ROUTE,
  },
  withApiKey<AgentRouteParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await getPublicAgent({ auth, agentId: readRecordId(params.id) }),
      ),
    ),
  ),
);

export const PATCH = withRouteEvent(
  {
    operation: RouteOperation.update_agent,
    trigger: TriggerType.programmatic,
    method: HttpMethod.patch,
    route: ROUTE,
  },
  withApiKey<AgentRouteParams>(async (request, { auth, params }) =>
    withPublicErrors(async () =>
      jsonResponse(
        await updatePublicAgent({
          auth,
          agentId: readRecordId(params.id),
          request,
        }),
      ),
    ),
  ),
);

export const DELETE = withRouteEvent(
  {
    operation: RouteOperation.delete_agent,
    trigger: TriggerType.programmatic,
    method: HttpMethod.delete,
    route: ROUTE,
  },
  withApiKey<AgentRouteParams>(async (_request, { auth, params }) =>
    withPublicErrors(async () => {
      await deletePublicAgent({ auth, agentId: readRecordId(params.id) });
      return noContentResponse();
    }),
  ),
);
