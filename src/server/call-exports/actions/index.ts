'use server';

import type { ActionResult } from '@/lib/action-result';
import { exportCallLogs } from '@/server/call-exports/export-call-logs';
import type { ExportCallLogsInput } from '@/server/call-exports/types';
import type { CallJobStarted } from '@/server/call-logs/types';
import { runAction } from '@/server/common/run-action';
import { CallExportsActionOperation } from '@/server/call-exports/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function exportCallLogsAction(
  args: ExportCallLogsInput,
): Promise<ActionResult<CallJobStarted>> {
  return withActionEvent(CallExportsActionOperation.exportCallLogs, () =>
    runAction(() => exportCallLogs(args)),
  );
}
