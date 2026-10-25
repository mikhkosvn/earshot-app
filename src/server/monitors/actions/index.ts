'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createMonitor } from '@/server/monitors/crud/create-monitor';
import { deleteMonitor } from '@/server/monitors/crud/delete-monitor';
import { getMonitor } from '@/server/monitors/crud/get-monitor';
import { listMonitors } from '@/server/monitors/crud/list-monitors';
import { setMonitorActive } from '@/server/monitors/crud/set-monitor-active';
import { updateMonitor } from '@/server/monitors/crud/update-monitor';
import { listMonitorAgentOptions } from '@/server/monitors/options/list-monitor-agent-options';
import { listMonitorScenarios } from '@/server/monitors/options/list-monitor-scenarios';
import { listMonitorRuns } from '@/server/monitors/runs/list-monitor-runs';
import type {
  CreateMonitorInput,
  ListMonitorsInput,
  MonitorActiveState,
  MonitorAgentOption,
  MonitorDetail,
  MonitorIdInput,
  MonitorListPage,
  MonitorProjectScopeInput,
  MonitorRef,
  MonitorRunItem,
  MonitorScenarioTree,
  SetMonitorActiveInput,
  UpdateMonitorInput,
} from '@/server/monitors/types';

export async function listMonitorsAction(
  args: ListMonitorsInput,
): Promise<MonitorListPage> {
  return listMonitors(args);
}

export async function getMonitorAction(
  args: MonitorIdInput,
): Promise<MonitorDetail> {
  return getMonitor(args);
}

export async function listMonitorRunsAction(
  args: MonitorIdInput,
): Promise<MonitorRunItem[]> {
  return listMonitorRuns(args);
}

export async function listMonitorAgentOptionsAction(
  args: MonitorProjectScopeInput,
): Promise<MonitorAgentOption[]> {
  return listMonitorAgentOptions(args);
}

export async function listMonitorScenariosAction(
  args: MonitorProjectScopeInput,
): Promise<MonitorScenarioTree> {
  return listMonitorScenarios(args);
}

export async function createMonitorAction(
  args: CreateMonitorInput,
): Promise<ActionResult<MonitorRef>> {
  return runAction(() => createMonitor(args));
}

export async function updateMonitorAction(
  args: UpdateMonitorInput,
): Promise<ActionResult<MonitorRef>> {
  return runAction(() => updateMonitor(args));
}

export async function setMonitorActiveAction(
  args: SetMonitorActiveInput,
): Promise<ActionResult<MonitorActiveState>> {
  return runAction(() => setMonitorActive(args));
}

export async function deleteMonitorAction(
  args: MonitorIdInput,
): Promise<ActionResult<MonitorRef>> {
  return runAction(() => deleteMonitor(args));
}
