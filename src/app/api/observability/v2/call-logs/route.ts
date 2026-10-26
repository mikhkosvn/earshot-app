import { TriggerType } from '@/lib/logging/constants';
import { listPublicCallLogs } from '@/server/call-logs/observe/list-public-call-logs';
import { withActionErrors } from '@/server/call-logs/utils/payload/action-error-response';
import { HttpMethod, RouteOperation } from '@/server/public-api/constants';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withRouteEvent } from '@/server/public-api/with-route-event';

export const GET = withRouteEvent(
  {
    operation: RouteOperation.list_call_logs,
    trigger: TriggerType.programmatic,
    method: HttpMethod.get,
    route: '/api/observability/v2/call-logs',
  },
  withApiKey(async (request, { auth }) =>
    withActionErrors(async () =>
      jsonResponse(await listPublicCallLogs({ auth, request })),
    ),
  ),
);
