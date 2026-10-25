'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getResult } from '@/server/results/detail/get-result';
import { getResultStatus } from '@/server/results/detail/get-result-status';
import { exportResults } from '@/server/results/list/export-results';
import { listResultFilterOptions } from '@/server/results/list/list-result-filter-options';
import { listResults } from '@/server/results/list/list-results';
import { deleteResults } from '@/server/results/manage/delete-results';
import { renameResult } from '@/server/results/manage/rename-result';
import { deleteRuns } from '@/server/results/runs/delete-runs';
import { getRun } from '@/server/results/runs/get-run';
import { listRuns } from '@/server/results/runs/list-runs';
import type {
  DeleteResultsInput,
  DeleteRunsInput,
  ExportResultsInput,
  ListResultsInput,
  ListRunsInput,
  ProjectScopeInput,
  RenameResultInput,
  ResultDetail,
  ResultFilterOptions,
  ResultIdInput,
  ResultListPage,
  ResultStatusView,
  RunDetail,
  RunIdInput,
  RunListPage,
} from '@/server/results/types';

export async function listResultsAction(
  args: ListResultsInput,
): Promise<ResultListPage> {
  return listResults(args);
}

export async function listRunsAction(
  args: ListRunsInput,
): Promise<RunListPage> {
  return listRuns(args);
}

export async function listResultFilterOptionsAction(
  args: ProjectScopeInput,
): Promise<ResultFilterOptions> {
  return listResultFilterOptions(args);
}

export async function getResultAction(
  args: ResultIdInput,
): Promise<ResultDetail> {
  return getResult(args);
}

export async function getResultStatusAction(
  args: ResultIdInput,
): Promise<ResultStatusView> {
  return getResultStatus(args);
}

export async function getRunAction(args: RunIdInput): Promise<RunDetail> {
  return getRun(args);
}

export async function exportResultsAction(
  args: ExportResultsInput,
): Promise<ActionResult<{ fileName: string; content: string }>> {
  return runAction(() => exportResults(args));
}

export async function deleteResultsAction(
  args: DeleteResultsInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => deleteResults(args));
}

export async function deleteRunsAction(
  args: DeleteRunsInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => deleteRuns(args));
}

export async function renameResultAction(
  args: RenameResultInput,
): Promise<ActionResult<{ id: number; name: string }>> {
  return runAction(() => renameResult(args));
}
