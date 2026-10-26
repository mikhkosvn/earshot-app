import 'server-only';

import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { callLogIdsSchema } from '@/server/call-logs/schemas';
import type { CallJobStarted } from '@/server/call-logs/types';
import { scoreCallLog } from '@/server/call-logs/utils/processing/score-call-log';
import { requestOrigin } from '@/server/call-logs/utils/request-origin';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const progressText = (done: number, total: number) =>
  `${done}/${total} completed`;

export const recomputeCallMetrics = withValidation(
  callLogIdsSchema,
  async ({ projectId, callLogIds }): Promise<CallJobStarted> => {
    const { user } = await requireProjectAccess(projectId);
    const rows = await prisma.callLog.findMany({
      where: { id: { in: callLogIds }, projectId },
      select: { id: true },
    });
    const ids = rows.map((row) => row.id);
    addEventFields({
      project: { id: projectId },
      call_logs: { requested: callLogIds.length, found: ids.length },
    });
    const origin = await requestOrigin();
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.reevaluation,
      input: { callLogIds: ids },
      initialStep: progressText(0, ids.length),
      run: async ({ setStep, setResult }) => {
        for (const [index, callLogId] of ids.entries()) {
          await scoreCallLog({
            callLogId,
            event: WebhookEvent.callLogReevaluated,
            origin,
          });
          await setStep(progressText(index + 1, ids.length));
        }
        addEventFields({ call_logs: { scored: ids.length } });
        await setResult({ summary: progressText(ids.length, ids.length) });
      },
    });
  },
);
