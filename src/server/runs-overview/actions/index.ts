'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createConfiguration } from '@/server/runs-overview/configurations/create-configuration';
import { listConfigurations } from '@/server/runs-overview/configurations/list-configurations';
import { getFilterOptions } from '@/server/runs-overview/get-filter-options';
import { getRunsOverview } from '@/server/runs-overview/get-runs-overview';
import type {
  CreateConfigurationInput,
  GetRunsOverviewInput,
  ProjectIdInput,
  RunsOverview,
  RunsOverviewConfigurationItem,
  RunsOverviewFilterOptions,
} from '@/server/runs-overview/types';

export async function getRunsOverviewAction(
  args: GetRunsOverviewInput,
): Promise<RunsOverview> {
  return getRunsOverview(args);
}

export async function getRunsOverviewFilterOptionsAction(
  args: ProjectIdInput,
): Promise<RunsOverviewFilterOptions> {
  return getFilterOptions(args);
}

export async function listRunsOverviewConfigurationsAction(
  args: ProjectIdInput,
): Promise<RunsOverviewConfigurationItem[]> {
  return listConfigurations(args);
}

export async function createRunsOverviewConfigurationAction(
  args: CreateConfigurationInput,
): Promise<ActionResult<RunsOverviewConfigurationItem>> {
  return runAction(() => createConfiguration(args));
}
