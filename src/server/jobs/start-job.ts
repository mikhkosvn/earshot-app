import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  type JobKind,
  JobStatus,
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { scheduleAfterResponse } from '@/server/common/schedule-after-response';
import { JOB_KIND_NAME, JobCompletion } from '@/server/jobs/constants';
import type { JobContext, StartedJob, StartJobArgs } from '@/server/jobs/types';

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The task failed.';
};

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

  scheduleAfterResponse(async () => {
    try {
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { status: JobStatus.running, startedAt: new Date() },
      });
      await args.run(context);
      if (args.completion === JobCompletion.external) return;
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { status: JobStatus.completed, finishedAt: new Date() },
      });
    } catch (error) {
      console.error(`[jobs] The job ${job.id} failed.`, error);
      const message = errorText(error);
      await prisma.backgroundJob
        .update({
          where: { id: job.id },
          data: {
            status: JobStatus.failed,
            error: message,
            finishedAt: new Date(),
          },
        })
        .catch((updateError: unknown) =>
          console.error(
            `[jobs] The job ${job.id} status write failed.`,
            updateError,
          ),
        );
      await notifyFailure(
        { projectId: args.projectId, userId, kind: args.kind },
        message,
      ).catch((notifyError: unknown) =>
        console.error(
          `[jobs] The failure notification of job ${job.id} failed.`,
          notifyError,
        ),
      );
    }
  });

  return { jobId: job.id };
};
