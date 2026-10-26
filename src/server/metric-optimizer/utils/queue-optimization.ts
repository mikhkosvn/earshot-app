import 'server-only';

import { JobKind, OptimizationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import type { LabDraft } from '@/server/labs/types';
import { ACTIVE_OPTIMIZATION_STATUSES } from '@/server/metric-optimizer/constants/optimization-statuses';
import {
  SCHEDULE_INPUT_KEY,
  SCHEDULE_NAME_INPUT_KEY,
} from '@/server/metric-optimizer/constants/optimizer-limits';
import type { QueuedOptimization } from '@/server/metric-optimizer/types';
import { runOptimization } from '@/server/metric-optimizer/utils/run-optimization';

interface QueueOptimizationArgs {
  metricId: number;
  userId: number | null;
  draft: LabDraft | null;
  schedule?: ScheduleRef | null;
}

export interface ScheduleRef {
  id: number;
  name: string;
}

const scheduleInput = (schedule: ScheduleRef | null) => {
  if (!schedule) return {};
  return {
    [SCHEDULE_INPUT_KEY]: schedule.id,
    [SCHEDULE_NAME_INPUT_KEY]: schedule.name,
  };
};

export const NO_REVIEWS_MESSAGE = 'You need at least 1 review to auto improve';

export const queueOptimization = async ({
  metricId,
  userId,
  draft,
  schedule = null,
}: QueueOptimizationArgs): Promise<QueuedOptimization> => {
  const metric = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId },
    select: { id: true, name: true, projectId: true },
  });
  const active = await prisma.metricOptimizationSession.count({
    where: { metricId, status: { in: ACTIVE_OPTIMIZATION_STATUSES } },
  });
  if (active > 0) {
    throw new ActionError('Auto improve is already in progress.');
  }
  const reviews = await prisma.labReview.findMany({
    where: { metricId },
    select: { testSetId: true },
  });
  if (reviews.length === 0) throw new ActionError(NO_REVIEWS_MESSAGE);
  await prisma.metricOptimizationSession.updateMany({
    where: { metricId, status: OptimizationStatus.awaiting_review },
    data: { status: OptimizationStatus.dismissed, dismissedAt: new Date() },
  });
  const session = await prisma.metricOptimizationSession.create({
    data: {
      metricId,
      status: OptimizationStatus.queued,
      simplifiedPrompt: draft?.description ?? null,
      createdById: userId,
      testSets: {
        create: reviews.map((review) => ({ testSetId: review.testSetId })),
      },
    },
    select: { id: true },
  });
  const { jobId } = await startJob({
    projectId: metric.projectId,
    userId,
    kind: JobKind.metric_optimization,
    input: {
      metricId,
      sessionId: session.id,
      metricName: metric.name,
      ...scheduleInput(schedule),
    },
    initialStep: `Improving ${metric.name}`,
    run: (context) =>
      runOptimization({ sessionId: session.id, draft, context }),
  });
  await prisma.metricOptimizationSession.update({
    where: { id: session.id },
    data: { jobId },
  });
  addEventFields({
    metric: { id: metricId },
    project: { id: metric.projectId },
    optimization_session: { id: session.id, review_count: reviews.length },
    job: { id: jobId },
    optimizer_schedule: { id: schedule?.id ?? null },
  });
  return { sessionId: session.id, jobId };
};
