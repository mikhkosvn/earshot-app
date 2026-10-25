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
import { MonitorsActionOperation } from '@/server/monitors/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listMonitorsAction(
  args: ListMonitorsInput,
): Promise<MonitorListPage> {
  return withActionEvent(MonitorsActionOperation.listMonitors, () =>
    listMonitors(args),
  );
}

export async function getMonitorAction(
  args: MonitorIdInput,
): Promise<MonitorDetail> {
  return withActionEvent(MonitorsActionOperation.getMonitor, () =>
    getMonitor(args),
  );
}

export async function listMonitorRunsAction(
  args: MonitorIdInput,
): Promise<MonitorRunItem[]> {
  return withActionEvent(MonitorsActionOperation.listMonitorRuns, () =>
    listMonitorRuns(args),
  );
}

export async function listMonitorAgentOptionsAction(
  args: MonitorProjectScopeInput,
): Promise<MonitorAgentOption[]> {
  return withActionEvent(MonitorsActionOperation.listMonitorAgentOptions, () =>
    listMonitorAgentOptions(args),
  );
}

export async function listMonitorScenariosAction(
  args: MonitorProjectScopeInput,
): Promise<MonitorScenarioTree> {
  return withActionEvent(MonitorsActionOperation.listMonitorScenarios, () =>
    listMonitorScenarios(args),
  );
}

export async function createMonitorAction(
  args: CreateMonitorInput,
): Promise<ActionResult<MonitorRef>> {
  return withActionEvent(MonitorsActionOperation.createMonitor, () =>
    runAction(() => createMonitor(args)),
  );
}

export async function updateMonitorAction(
  args: UpdateMonitorInput,
): Promise<ActionResult<MonitorRef>> {
  return withActionEvent(MonitorsActionOperation.updateMonitor, () =>
    runAction(() => updateMonitor(args)),
  );
}

export async function setMonitorActiveAction(
  args: SetMonitorActiveInput,
): Promise<ActionResult<MonitorActiveState>> {
  return withActionEvent(MonitorsActionOperation.setMonitorActive, () =>
    runAction(() => setMonitorActive(args)),
  );
}

export async function deleteMonitorAction(
  args: MonitorIdInput,
): Promise<ActionResult<MonitorRef>> {
  return withActionEvent(MonitorsActionOperation.deleteMonitor, () =>
    runAction(() => deleteMonitor(args)),
  );
}
