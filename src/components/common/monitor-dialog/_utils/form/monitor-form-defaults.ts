import { CallerNumberMode } from '@/generated/prisma/enums';
import { ExecutionMode } from '@/server/monitors/constants/execution-mode';
import type {
  MonitorAgentOption,
  MonitorDetail,
  MonitorScenarioTree,
} from '@/server/monitors/types';

import {
  MONITOR_PRESETS,
  type MonitorPreset,
  ScenarioScope,
} from '../../_constants/monitor-preset';
import {
  DEFAULT_SCHEDULE_MODE,
  SCHEDULE_MODE_CRON,
  ScheduleModeCadence,
} from '../../_constants/schedule-mode';
import type { MonitorFormValues } from '../../_schemas/monitor-form-schema';
import { browserTimezone } from '../schedule/browser-timezone';
import { scheduleModeForCron } from '../schedule/schedule-mode-for-cron';
import { findAgent } from './monitor-name';

export interface CreateMonitorPrefill {
  agentId?: number | null;
  evaluatorIds?: number[];
  preset?: MonitorPreset | null;
}

const allScenarioIds = (tree: MonitorScenarioTree) =>
  tree.folders.flatMap((folder) =>
    folder.scenarios.map((scenario) => scenario.id),
  );

const presetScenarioIds = (
  tree: MonitorScenarioTree,
  preset: MonitorPreset,
) => {
  const ids = allScenarioIds(tree).sort((left, right) => left - right);
  if (MONITOR_PRESETS[preset].scenarioScope === ScenarioScope.first) {
    return ids.slice(0, 1);
  }
  return ids;
};

const prefillScheduleMode = (preset: MonitorPreset | null | undefined) => {
  if (!preset) return DEFAULT_SCHEDULE_MODE;
  return MONITOR_PRESETS[preset].scheduleMode;
};

const prefillScenarioIds = (
  prefill: CreateMonitorPrefill,
  tree: MonitorScenarioTree,
) => {
  if (prefill.evaluatorIds) return prefill.evaluatorIds;
  if (prefill.preset) return presetScenarioIds(tree, prefill.preset);
  return [];
};

const prefillName = (
  agent: MonitorAgentOption | null,
  scheduleMode: MonitorFormValues['scheduleMode'],
) => {
  if (!agent) return '';
  return `${agent.name} - ${ScheduleModeCadence[scheduleMode]}`;
};

export const createMonitorDefaults = (
  prefill: CreateMonitorPrefill,
  agents: MonitorAgentOption[],
  tree: MonitorScenarioTree,
): MonitorFormValues => {
  const scheduleMode = prefillScheduleMode(prefill.preset);
  const agent = findAgent(agents, prefill.agentId ?? null);
  return {
    name: prefillName(agent, scheduleMode),
    autoName: true,
    agentId: agent?.id ?? null,
    executionMode: ExecutionMode.voice,
    evaluatorIds: prefillScenarioIds(prefill, tree),
    personalityIds: [],
    scheduleMode,
    cronExpression: SCHEDULE_MODE_CRON[scheduleMode],
    timezone: browserTimezone(),
    frequency: 1,
    concurrencyLimit: null,
    callsPerSecond: null,
    callerNumberMode: CallerNumberMode.same_number,
    agentNumber: agent?.phoneNumber ?? '',
  };
};

export const editMonitorDefaults = (
  detail: MonitorDetail,
  agents: MonitorAgentOption[],
): MonitorFormValues => ({
  name: detail.name,
  autoName: false,
  agentId: detail.agentId,
  executionMode: ExecutionMode.voice,
  evaluatorIds: detail.evaluatorIds,
  personalityIds: detail.personalityIds,
  scheduleMode: scheduleModeForCron(detail.cronExpression),
  cronExpression: detail.cronExpression,
  timezone: detail.timezone,
  frequency: detail.frequency,
  concurrencyLimit: detail.concurrencyLimit,
  callsPerSecond: detail.callsPerSecond,
  callerNumberMode: detail.callerNumberMode,
  agentNumber:
    detail.agentNumber ?? findAgent(agents, detail.agentId)?.phoneNumber ?? '',
});
