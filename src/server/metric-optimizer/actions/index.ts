'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { applyOptimizationProposal } from '@/server/metric-optimizer/apply-optimization-proposal';
import { dismissOptimizationProposal } from '@/server/metric-optimizer/dismiss-optimization-proposal';
import { createOptimizerSchedule } from '@/server/metric-optimizer/schedules/create-optimizer-schedule';
import { deleteOptimizerSchedule } from '@/server/metric-optimizer/schedules/delete-optimizer-schedule';
import { listOptimizerSchedules } from '@/server/metric-optimizer/schedules/list-optimizer-schedules';
import { updateOptimizerSchedule } from '@/server/metric-optimizer/schedules/update-optimizer-schedule';
import { startMetricOptimization } from '@/server/metric-optimizer/start-metric-optimization';
import type {
  CreateOptimizerScheduleInput,
  ListOptimizerSchedulesInput,
  OptimizationSessionInput,
  OptimizerScheduleIdInput,
  OptimizerScheduleView,
  QueuedOptimization,
  StartMetricOptimizationInput,
  UpdateOptimizerScheduleInput,
} from '@/server/metric-optimizer/types';
import type { MetricDetail } from '@/server/metrics/types';

export async function listOptimizerSchedulesAction(
  args: ListOptimizerSchedulesInput,
): Promise<OptimizerScheduleView[]> {
  return listOptimizerSchedules(args);
}

export async function startMetricOptimizationAction(
  args: StartMetricOptimizationInput,
): Promise<ActionResult<QueuedOptimization>> {
  return runAction(() => startMetricOptimization(args));
}

export async function applyOptimizationProposalAction(
  args: OptimizationSessionInput,
): Promise<ActionResult<MetricDetail>> {
  return runAction(() => applyOptimizationProposal(args));
}

export async function dismissOptimizationProposalAction(
  args: OptimizationSessionInput,
): Promise<ActionResult<{ sessionId: number; metricId: number }>> {
  return runAction(() => dismissOptimizationProposal(args));
}

export async function createOptimizerScheduleAction(
  args: CreateOptimizerScheduleInput,
): Promise<ActionResult<OptimizerScheduleView>> {
  return runAction(() => createOptimizerSchedule(args));
}

export async function updateOptimizerScheduleAction(
  args: UpdateOptimizerScheduleInput,
): Promise<ActionResult<OptimizerScheduleView>> {
  return runAction(() => updateOptimizerSchedule(args));
}

export async function deleteOptimizerScheduleAction(
  args: OptimizerScheduleIdInput,
): Promise<ActionResult<{ scheduleId: number; projectId: number }>> {
  return runAction(() => deleteOptimizerSchedule(args));
}
