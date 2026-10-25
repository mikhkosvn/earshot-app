import 'server-only';

import { JobKind } from '@/generated/prisma/enums';
import type { CallProcessingInput } from '@/server/call-logs/types';
import { processCallLog } from '@/server/call-logs/utils/processing/process-call-log';
import { startJob } from '@/server/jobs/start-job';

export const startCallProcessing = (
  projectId: number,
  input: CallProcessingInput,
) =>
  startJob({
    projectId,
    userId: null,
    kind: JobKind.call_import,
    input,
    initialStep: 'Processing the call',
    run: (context) => processCallLog(context.input),
  });
