import { TriggerType } from '@/lib/logging/constants';
import { ingestObservedCall } from '@/server/call-logs/observe/ingest-observed-call';
import { withActionErrors } from '@/server/call-logs/utils/payload/action-error-response';
import { HttpMethod, RouteOperation } from '@/server/public-api/constants';
import { nonFieldErrorResponse } from '@/server/public-api/error-response';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';
import { withRouteEvent } from '@/server/public-api/with-route-event';

const readJson = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    return { ok: true as const, body };
  } catch {
    return { ok: false as const };
  }
};

export const POST = withRouteEvent(
  {
    operation: RouteOperation.observe_call,
    trigger: TriggerType.programmatic,
    method: HttpMethod.post,
    route: '/api/observability/v1/observe',
  },
  withApiKey(async (request, { auth }) =>
    withActionErrors(async () => {
      const parsed = await readJson(request);
      if (!parsed.ok) return nonFieldErrorResponse(['Send a JSON body.']);
      const callLog = await ingestObservedCall({
        auth,
        body: parsed.body,
        origin: new URL(request.url).origin,
      });
      return jsonResponse(callLog, 201);
    }),
  ),
);
