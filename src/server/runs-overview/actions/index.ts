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
import { RunsOverviewActionOperation } from '@/server/runs-overview/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getRunsOverviewAction(
  args: GetRunsOverviewInput,
): Promise<RunsOverview> {
  return withActionEvent(RunsOverviewActionOperation.getRunsOverview, () =>
    getRunsOverview(args),
  );
}

export async function getRunsOverviewFilterOptionsAction(
  args: ProjectIdInput,
): Promise<RunsOverviewFilterOptions> {
  return withActionEvent(
    RunsOverviewActionOperation.getRunsOverviewFilterOptions,
    () => getFilterOptions(args),
  );
}

export async function listRunsOverviewConfigurationsAction(
  args: ProjectIdInput,
): Promise<RunsOverviewConfigurationItem[]> {
  return withActionEvent(
    RunsOverviewActionOperation.listRunsOverviewConfigurations,
    () => listConfigurations(args),
  );
}

export async function createRunsOverviewConfigurationAction(
  args: CreateConfigurationInput,
): Promise<ActionResult<RunsOverviewConfigurationItem>> {
  return withActionEvent(
    RunsOverviewActionOperation.createRunsOverviewConfiguration,
    () => runAction(() => createConfiguration(args)),
  );
}
