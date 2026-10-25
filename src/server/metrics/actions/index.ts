'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import type { StartedJob } from '@/server/jobs/types';
import { generateEvaluationTrigger } from '@/server/metrics/assist/generate-evaluation-trigger';
import { improveMetric } from '@/server/metrics/assist/improve-metric';
import { createMetric } from '@/server/metrics/edit/create-metric';
import { deleteMetrics } from '@/server/metrics/edit/delete-metrics';
import { getMetric } from '@/server/metrics/edit/get-metric';
import { listMetricVersions } from '@/server/metrics/edit/list-metric-versions';
import { updateMetric } from '@/server/metrics/edit/update-metric';
import { bulkCreateMetrics } from '@/server/metrics/generation/bulk-create-metrics';
import { startMetricGeneration } from '@/server/metrics/generation/start-metric-generation';
import { startQuickMetricBuild } from '@/server/metrics/generation/start-quick-metric-build';
import { listAgentOptions } from '@/server/metrics/list/list-agent-options';
import { listMetricOptions } from '@/server/metrics/list/list-metric-options';
import { listMetrics } from '@/server/metrics/list/list-metrics';
import { listScenarioOptions } from '@/server/metrics/list/list-scenario-options';
import { getPatternReview } from '@/server/metrics/pattern-reviews/get-pattern-review';
import { rebuildPatternReview } from '@/server/metrics/pattern-reviews/rebuild-pattern-review';
import { setPatternCorrection } from '@/server/metrics/pattern-reviews/set-pattern-correction';
import { copyPredefinedMetrics } from '@/server/metrics/predefined/copy-predefined-metrics';
import { listPredefinedMetrics } from '@/server/metrics/predefined/list-predefined-metrics';
import { assignMetricAgents } from '@/server/metrics/settings/assign-metric-agents';
import { bulkUpdateMetricFlags } from '@/server/metrics/settings/bulk-update-metric-flags';
import { reorderMetrics } from '@/server/metrics/settings/reorder-metrics';
import { updateMetricAgents } from '@/server/metrics/settings/update-metric-agents';
import { updateMetricFlags } from '@/server/metrics/settings/update-metric-flags';
import { updateMetricSampleRate } from '@/server/metrics/settings/update-metric-sample-rate';
import type {
  AgentOption,
  AssignMetricAgentsInput,
  BulkCreateMetricsInput,
  BulkUpdateMetricFlagsInput,
  CopyPredefinedMetricsInput,
  CreatedMetric,
  CreateMetricInput,
  DeleteMetricsInput,
  GeneratedTrigger,
  GenerateEvaluationTriggerInput,
  ImprovedMetric,
  ImproveMetricInput,
  ListMetricsInput,
  MetricDetail,
  MetricIdInput,
  MetricListItem,
  MetricOption,
  MetricReference,
  MetricVersionView,
  PatternReviewView,
  PredefinedMetricCard,
  ProjectIdInput,
  ReorderMetricsInput,
  ReviewIdInput,
  ScenarioOption,
  SetPatternCorrectionInput,
  StartMetricGenerationInput,
  StartQuickMetricBuildInput,
  UpdateMetricAgentsInput,
  UpdateMetricFlagsInput,
  UpdateMetricInput,
  UpdateMetricSampleRateInput,
} from '@/server/metrics/types';
import { MetricsActionOperation } from '@/server/metrics/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listMetricsAction(
  args: ListMetricsInput,
): Promise<MetricListItem[]> {
  return withActionEvent(MetricsActionOperation.listMetrics, () =>
    listMetrics(args),
  );
}

export async function listMetricOptionsAction(
  args: ProjectIdInput,
): Promise<MetricOption[]> {
  return withActionEvent(MetricsActionOperation.listMetricOptions, () =>
    listMetricOptions(args),
  );
}

export async function listAgentOptionsAction(
  args: ProjectIdInput,
): Promise<AgentOption[]> {
  return withActionEvent(MetricsActionOperation.listAgentOptions, () =>
    listAgentOptions(args),
  );
}

export async function listScenarioOptionsAction(
  args: ProjectIdInput,
): Promise<ScenarioOption[]> {
  return withActionEvent(MetricsActionOperation.listScenarioOptions, () =>
    listScenarioOptions(args),
  );
}

export async function listPredefinedMetricsAction(
  args: ProjectIdInput,
): Promise<PredefinedMetricCard[]> {
  return withActionEvent(MetricsActionOperation.listPredefinedMetrics, () =>
    listPredefinedMetrics(args),
  );
}

export async function getMetricAction(
  args: MetricIdInput,
): Promise<MetricDetail> {
  return withActionEvent(MetricsActionOperation.getMetric, () =>
    getMetric(args),
  );
}

export async function listMetricVersionsAction(
  args: MetricIdInput,
): Promise<MetricVersionView[]> {
  return withActionEvent(MetricsActionOperation.listMetricVersions, () =>
    listMetricVersions(args),
  );
}

export async function getPatternReviewAction(
  args: ReviewIdInput,
): Promise<PatternReviewView> {
  return withActionEvent(MetricsActionOperation.getPatternReview, () =>
    getPatternReview(args),
  );
}

export async function createMetricAction(
  args: CreateMetricInput,
): Promise<ActionResult<CreatedMetric>> {
  return withActionEvent(MetricsActionOperation.createMetric, () =>
    runAction(() => createMetric(args)),
  );
}

export async function updateMetricAction(
  args: UpdateMetricInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(MetricsActionOperation.updateMetric, () =>
    runAction(() => updateMetric(args)),
  );
}

export async function deleteMetricsAction(
  args: DeleteMetricsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(MetricsActionOperation.deleteMetrics, () =>
    runAction(() => deleteMetrics(args)),
  );
}

export async function updateMetricFlagsAction(
  args: UpdateMetricFlagsInput,
): Promise<ActionResult<MetricListItem>> {
  return withActionEvent(MetricsActionOperation.updateMetricFlags, () =>
    runAction(() => updateMetricFlags(args)),
  );
}

export async function bulkUpdateMetricFlagsAction(
  args: BulkUpdateMetricFlagsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(MetricsActionOperation.bulkUpdateMetricFlags, () =>
    runAction(() => bulkUpdateMetricFlags(args)),
  );
}

export async function updateMetricSampleRateAction(
  args: UpdateMetricSampleRateInput,
): Promise<ActionResult<MetricListItem>> {
  return withActionEvent(MetricsActionOperation.updateMetricSampleRate, () =>
    runAction(() => updateMetricSampleRate(args)),
  );
}

export async function reorderMetricsAction(
  args: ReorderMetricsInput,
): Promise<ActionResult<{ metricIds: number[] }>> {
  return withActionEvent(MetricsActionOperation.reorderMetrics, () =>
    runAction(() => reorderMetrics(args)),
  );
}

export async function updateMetricAgentsAction(
  args: UpdateMetricAgentsInput,
): Promise<ActionResult<MetricListItem>> {
  return withActionEvent(MetricsActionOperation.updateMetricAgents, () =>
    runAction(() => updateMetricAgents(args)),
  );
}

export async function assignMetricAgentsAction(
  args: AssignMetricAgentsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(MetricsActionOperation.assignMetricAgents, () =>
    runAction(() => assignMetricAgents(args)),
  );
}

export async function copyPredefinedMetricsAction(
  args: CopyPredefinedMetricsInput,
): Promise<ActionResult<MetricReference[]>> {
  return withActionEvent(MetricsActionOperation.copyPredefinedMetrics, () =>
    runAction(() => copyPredefinedMetrics(args)),
  );
}

export async function startMetricGenerationAction(
  args: StartMetricGenerationInput,
): Promise<ActionResult<StartedJob>> {
  return withActionEvent(MetricsActionOperation.startMetricGeneration, () =>
    runAction(() => startMetricGeneration(args)),
  );
}

export async function bulkCreateMetricsAction(
  args: BulkCreateMetricsInput,
): Promise<ActionResult<MetricReference[]>> {
  return withActionEvent(MetricsActionOperation.bulkCreateMetrics, () =>
    runAction(async () => {
      const created = await bulkCreateMetrics(args);
      return created.map(({ id, name }) => ({ id, name }));
    }),
  );
}

export async function startQuickMetricBuildAction(
  args: StartQuickMetricBuildInput,
): Promise<ActionResult<StartedJob>> {
  return withActionEvent(MetricsActionOperation.startQuickMetricBuild, () =>
    runAction(() => startQuickMetricBuild(args)),
  );
}

export async function improveMetricAction(
  args: ImproveMetricInput,
): Promise<ActionResult<ImprovedMetric>> {
  return withActionEvent(MetricsActionOperation.improveMetric, () =>
    runAction(() => improveMetric(args)),
  );
}

export async function generateEvaluationTriggerAction(
  args: GenerateEvaluationTriggerInput,
): Promise<ActionResult<GeneratedTrigger>> {
  return withActionEvent(MetricsActionOperation.generateEvaluationTrigger, () =>
    runAction(() => generateEvaluationTrigger(args)),
  );
}

export async function setPatternCorrectionAction(
  args: SetPatternCorrectionInput,
): Promise<ActionResult<PatternReviewView>> {
  return withActionEvent(MetricsActionOperation.setPatternCorrection, () =>
    runAction(() => setPatternCorrection(args)),
  );
}

export async function rebuildPatternReviewAction(
  args: ReviewIdInput,
): Promise<ActionResult<StartedJob>> {
  return withActionEvent(MetricsActionOperation.rebuildPatternReview, () =>
    runAction(() => rebuildPatternReview(args)),
  );
}
