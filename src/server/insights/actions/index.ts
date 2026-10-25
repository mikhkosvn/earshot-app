'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { dismissCategory } from '@/server/insights/categories/dismiss-category';
import { listInsightMetricOptions } from '@/server/insights/config/list-insight-metric-options';
import { saveInsightConfig } from '@/server/insights/config/save-insight-config';
import { setNewCategoryAlert } from '@/server/insights/config/set-new-category-alert';
import { turnOffInsights } from '@/server/insights/config/turn-off-insights';
import { dismissResearchMode } from '@/server/insights/deep-research/dismiss-research-mode';
import { getDeepResearch } from '@/server/insights/deep-research/get-deep-research';
import { startDeepResearch } from '@/server/insights/deep-research/start-deep-research';
import { startInsightRun } from '@/server/insights/generation/start-insight-run';
import { getInsightsOverview } from '@/server/insights/overview/get-insights-overview';
import type {
  CategoryIdInput,
  DeepResearchState,
  FailureModeIdInput,
  InsightJobStarted,
  InsightMetricInput,
  InsightMetricOption,
  InsightRangeInput,
  InsightsOverview,
  NewCategoryAlertInput,
  ProjectScopeInput,
  RunInsightInput,
  SaveInsightConfigInput,
} from '@/server/insights/types';

export async function listInsightMetricOptionsAction(
  args: ProjectScopeInput,
): Promise<InsightMetricOption[]> {
  return listInsightMetricOptions(args);
}

export async function getInsightsOverviewAction(
  args: InsightRangeInput,
): Promise<InsightsOverview> {
  return getInsightsOverview(args);
}

export async function getDeepResearchAction(
  args: ProjectScopeInput,
): Promise<DeepResearchState> {
  return getDeepResearch(args);
}

export async function saveInsightConfigAction(
  args: SaveInsightConfigInput,
): Promise<ActionResult<{ metricId: number }>> {
  return runAction(() => saveInsightConfig(args));
}

export async function turnOffInsightsAction(
  args: InsightMetricInput,
): Promise<ActionResult<{ metricId: number }>> {
  return runAction(() => turnOffInsights(args));
}

export async function setNewCategoryAlertAction(
  args: NewCategoryAlertInput,
): Promise<ActionResult<{ metricId: number }>> {
  return runAction(() => setNewCategoryAlert(args));
}

export async function startInsightRunAction(
  args: RunInsightInput,
): Promise<ActionResult<InsightJobStarted>> {
  return runAction(() => startInsightRun(args));
}

export async function dismissCategoryAction(
  args: CategoryIdInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => dismissCategory(args));
}

export async function startDeepResearchAction(
  args: ProjectScopeInput,
): Promise<ActionResult<InsightJobStarted>> {
  return runAction(() => startDeepResearch(args));
}

export async function dismissResearchModeAction(
  args: FailureModeIdInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => dismissResearchMode(args));
}
