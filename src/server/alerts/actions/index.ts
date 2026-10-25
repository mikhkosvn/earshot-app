'use server';

import type { ActionResult } from '@/lib/action-result';
import { getAlertFireCounts } from '@/server/alerts/list/get-alert-fire-counts';
import { getAlertReview } from '@/server/alerts/list/get-alert-review';
import { listAlertMetricOptions } from '@/server/alerts/list/list-alert-metric-options';
import { listAlerts } from '@/server/alerts/list/list-alerts';
import { createAlert } from '@/server/alerts/manage/create-alert';
import { deleteAlert } from '@/server/alerts/manage/delete-alert';
import { updateAlert } from '@/server/alerts/manage/update-alert';
import type {
  AlertFireCounts,
  AlertIdInput,
  AlertMetricOption,
  AlertReview,
  AlertReviewInput,
  AlertRow,
  CreateAlertInput,
  ProjectScopeInput,
  UpdateAlertInput,
} from '@/server/alerts/types';
import { runAction } from '@/server/common/run-action';

export async function getAlertReviewAction(
  args: AlertReviewInput,
): Promise<AlertReview> {
  return getAlertReview(args);
}

export async function getAlertFireCountsAction(
  args: AlertReviewInput,
): Promise<AlertFireCounts> {
  return getAlertFireCounts(args);
}

export async function listAlertsAction(
  args: ProjectScopeInput,
): Promise<AlertRow[]> {
  return listAlerts(args);
}

export async function listAlertMetricOptionsAction(
  args: ProjectScopeInput,
): Promise<AlertMetricOption[]> {
  return listAlertMetricOptions(args);
}

export async function createAlertAction(
  args: CreateAlertInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => createAlert(args));
}

export async function updateAlertAction(
  args: UpdateAlertInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => updateAlert(args));
}

export async function deleteAlertAction(
  args: AlertIdInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => deleteAlert(args));
}
