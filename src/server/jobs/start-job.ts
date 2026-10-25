import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  type JobKind,
  JobStatus,
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import { EventOutcome, TriggerType } from '@/lib/logging/constants';
import { prisma } from '@/lib/prisma';
import { EventKind } from '@/server/common/logging/constants';
import {
  addEventFields,
  recordCaughtError,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { scheduleAfterResponse } from '@/server/common/schedule-after-response';
import { JOB_KIND_NAME, JobCompletion, JobStep } from '@/server/jobs/constants';
import type { JobContext, StartedJob, StartJobArgs } from '@/server/jobs/types';

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The task failed.';
};

const JOB_OPERATION_PREFIX = 'job.';

const ignoreLoggedFailure = () => undefined;

const notifyFailure = async (
  args: { projectId: number; userId: number | null; kind: JobKind },
  message: string,
) => {
  if (!args.userId) return;
  await prisma.notification.create({
    data: {
      userId: args.userId,
      projectId: args.projectId,
      eventType: NotificationEventType.job_failed,
      severity: NotificationSeverity.error,
      title: `${JOB_KIND_NAME[args.kind]} failed`,
      body: message,
    },
  });
};

const runJob = async <TInput extends Prisma.InputJsonValue>(
  jobId: string,
  args: StartJobArgs<TInput>,
  context: JobContext<TInput>,
  userId: number | null,
) => {
  try {
    await prisma.backgroundJob.update({
      where: { id: jobId },
      data: { status: JobStatus.running, startedAt: new Date() },
    });
    await args.run(context);
    if (args.completion === JobCompletion.external) return;
    await prisma.backgroundJob.update({
      where: { id: jobId },
      data: { status: JobStatus.completed, finishedAt: new Date() },
    });
  } catch (error) {
    addEventFields({ outcome: EventOutcome.failure });
    recordCaughtError(error);
    const message = errorText(error);
    await prisma.backgroundJob
      .update({
        where: { id: jobId },
        data: {
          status: JobStatus.failed,
          error: message,
          finishedAt: new Date(),
        },
      })
      .catch((updateError: unknown) =>
        recordStepFailure(JobStep.status_write, updateError),
      );
    await notifyFailure(
      { projectId: args.projectId, userId, kind: args.kind },
      message,
    ).catch((notifyError: unknown) =>
      recordStepFailure(JobStep.failure_notification, notifyError),
    );
  }
};

export const startJob = async <TInput extends Prisma.InputJsonValue>(
  args: StartJobArgs<TInput>,
): Promise<StartedJob> => {
  const userId = args.userId ?? null;
  const job = await prisma.backgroundJob.create({
    data: {
      projectId: args.projectId,
      createdById: userId,
      kind: args.kind,
      status: JobStatus.queued,
      currentStep: args.initialStep ?? null,
      input: args.input,
    },
    select: { id: true },
  });

  const context: JobContext<TInput> = {
    jobId: job.id,
    projectId: args.projectId,
    userId,
    input: args.input,
    setStep: async (text) => {
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { currentStep: text },
      });
    },
    setResult: async (result) => {
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { result },
      });
    },
  };

  scheduleAfterResponse(() =>
    runWithEvent(
      {
        kind: EventKind.job,
        operation: `${JOB_OPERATION_PREFIX}${args.kind}`,
        trigger: TriggerType.programmatic,
        fields: {
          job: { id: job.id, kind: args.kind },
          project: { id: args.projectId },
          user: { id: userId },
        },
      },
      () => runJob(job.id, args, context, userId),
    ).catch(ignoreLoggedFailure),
  );

  return { jobId: job.id };
};
