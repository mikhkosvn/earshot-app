'use server';

import type { ActionResult } from '@/lib/action-result';
import { exportCallLogs } from '@/server/call-exports/export-call-logs';
import type { ExportCallLogsInput } from '@/server/call-exports/types';
import type { CallJobStarted } from '@/server/call-logs/types';
import { runAction } from '@/server/common/run-action';

export async function exportCallLogsAction(
  args: ExportCallLogsInput,
): Promise<ActionResult<CallJobStarted>> {
  return runAction(() => exportCallLogs(args));
}
