import 'server-only';

import { JobKind, JobStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { TestConnectionStatus } from '@/server/agents/constants/test-call';
import { testCallProgressSchema } from '@/server/agents/schemas';
import { finishedProgress } from '@/server/agents/test-calls/test-call-progress';
import { toPlacedCall } from '@/server/call-engine/events/to-placed-call';
import type { EndOfCallEvent } from '@/server/call-engine/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { completeJob } from '@/server/jobs/complete-job';

interface FinishTestCallArgs {
  jobId: string;
  event: EndOfCallEvent;
}

const summaryOf = (status: TestConnectionStatus) => {
  if (status === TestConnectionStatus.passed) return 'The test call passed.';
  return 'The test call did not pass.';
};

const loadRunningTestCall = async (jobId: string) => {
  const job = await prisma.backgroundJob.findUnique({
    where: { id: jobId },
    select: { kind: true, status: true, result: true },
  });
  if (job?.kind !== JobKind.test_call || job.status !== JobStatus.running) {
    return null;
  }
  const progress = testCallProgressSchema.safeParse(job.result);
  if (!progress.success) return null;
  const [connection] = progress.data.connections;
  if (!connection) return null;
  return { agentId: progress.data.agentId, connection };
};

export const finishTestCall = async ({ jobId, event }: FinishTestCallArgs) => {
  const testCall = await loadRunningTestCall(jobId);
  addEventFields({
    job: { id: jobId },
    test_call: { running: testCall !== null },
  });
  if (!testCall) return;
  const progress = finishedProgress(
    testCall.agentId,
    testCall.connection.type,
    testCall.connection.target,
    toPlacedCall(event, null),
  );
  addEventFields({
    agent: { id: testCall.agentId },
    test_call: {
      connection_type: testCall.connection.type,
      status: progress.connections[0].status,
    },
  });
  await completeJob({
    jobId,
    step: progress.headline,
    result: {
      ...progress,
      summary: summaryOf(progress.connections[0].status),
      deepLink: UrlGenerator.agent({ agentId: testCall.agentId }),
    },
  });
};
