import 'server-only';

import type { TriggerType } from '@/lib/logging/constants';
import { EventKind } from '@/server/common/logging/constants';
import {
  addEventFields,
  markEventFailure,
} from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import type { HttpMethod, RouteOperation } from '@/server/public-api/constants';

const STATUS_CODE_BAD_REQUEST = 400;

interface RouteEventStart {
  operation: RouteOperation;
  trigger: TriggerType;
  method: HttpMethod;
  route: string;
}

const recordStatus = (response: Response) => {
  if (response.status >= STATUS_CODE_BAD_REQUEST) {
    markEventFailure(response.status);
    return response;
  }
  addEventFields({ status_code: response.status });
  return response;
};

export const withRouteEvent =
  <TArgs extends unknown[]>(
    start: RouteEventStart,
    handler: (...args: TArgs) => Promise<Response>,
  ) =>
  (...args: TArgs) =>
    runWithEvent(
      {
        kind: EventKind.route_handler,
        operation: start.operation,
        trigger: start.trigger,
        fields: { http: { method: start.method, route: start.route } },
      },
      async () => recordStatus(await handler(...args)),
    );
