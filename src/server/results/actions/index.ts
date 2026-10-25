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
import { ResultsActionOperation } from '@/server/results/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listResultsAction(
  args: ListResultsInput,
): Promise<ResultListPage> {
  return withActionEvent(ResultsActionOperation.listResults, () =>
    listResults(args),
  );
}

export async function listRunsAction(
  args: ListRunsInput,
): Promise<RunListPage> {
  return withActionEvent(ResultsActionOperation.listRuns, () => listRuns(args));
}

export async function listResultFilterOptionsAction(
  args: ProjectScopeInput,
): Promise<ResultFilterOptions> {
  return withActionEvent(ResultsActionOperation.listResultFilterOptions, () =>
    listResultFilterOptions(args),
  );
}

export async function getResultAction(
  args: ResultIdInput,
): Promise<ResultDetail> {
  return withActionEvent(ResultsActionOperation.getResult, () =>
    getResult(args),
  );
}

export async function getResultStatusAction(
  args: ResultIdInput,
): Promise<ResultStatusView> {
  return withActionEvent(ResultsActionOperation.getResultStatus, () =>
    getResultStatus(args),
  );
}

export async function getRunAction(args: RunIdInput): Promise<RunDetail> {
  return withActionEvent(ResultsActionOperation.getRun, () => getRun(args));
}

export async function exportResultsAction(
  args: ExportResultsInput,
): Promise<ActionResult<{ fileName: string; content: string }>> {
  return withActionEvent(ResultsActionOperation.exportResults, () =>
    runAction(() => exportResults(args)),
  );
}

export async function deleteResultsAction(
  args: DeleteResultsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(ResultsActionOperation.deleteResults, () =>
    runAction(() => deleteResults(args)),
  );
}

export async function deleteRunsAction(
  args: DeleteRunsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(ResultsActionOperation.deleteRuns, () =>
    runAction(() => deleteRuns(args)),
  );
}

export async function renameResultAction(
  args: RenameResultInput,
): Promise<ActionResult<{ id: number; name: string }>> {
  return withActionEvent(ResultsActionOperation.renameResult, () =>
    runAction(() => renameResult(args)),
  );
}
