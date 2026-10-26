import 'server-only';

import { isActionResult } from '@/lib/action-result';

import { EventKind, STATUS_CODE_OK } from './constants';
import { addEventFields, markEventFailure } from './event-fields';
import { runWithEvent } from './run-with-event';

export const withActionEvent = <T>(
  operation: string,
  fn: () => Promise<T>,
): Promise<T> =>
  runWithEvent({ kind: EventKind.server_action, operation }, async () => {
    const result = await fn();
    if (isActionResult(result) && !result.ok) {
      markEventFailure(result.status);
      return result;
    }
    addEventFields({ status_code: STATUS_CODE_OK });
    return result;
  });
