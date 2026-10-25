import type { z } from 'zod';

import type {
  CallerNumberMode,
  MonitorRunStatus,
  Timezone,
} from '@/generated/prisma/enums';
import type {
  createMonitorSchema,
  listMonitorsSchema,
  monitorFieldsSchema,
  monitorIdSchema,
  monitorProjectScopeSchema,
  setMonitorActiveSchema,
  updateMonitorSchema,
} from '@/server/monitors/schemas';

export type MonitorProjectScopeInput = z.input<
  typeof monitorProjectScopeSchema
>;
export type ListMonitorsInput = z.input<typeof listMonitorsSchema>;
export type MonitorIdInput = z.input<typeof monitorIdSchema>;
export type MonitorFieldsInput = z.input<typeof monitorFieldsSchema>;
export type CreateMonitorInput = z.input<typeof createMonitorSchema>;
export type UpdateMonitorInput = z.input<typeof updateMonitorSchema>;
export type SetMonitorActiveInput = z.input<typeof setMonitorActiveSchema>;

export type MonitorRef = { id: number };

export type MonitorListItem = {
  id: number;
  name: string;
  agentId: number;
  cronExpression: string;
  timezone: Timezone;
  frequency: number;
  scenarioCount: number;
  nextRunAt: Date | null;
  isActive: boolean;
};

export type MonitorListPage = {
  count: number;
  results: MonitorListItem[];
};

export type MonitorDetail = {
  id: number;
  name: string;
  agentId: number;
  evaluatorIds: number[];
  personalityIds: number[];
  cronExpression: string;
  timezone: Timezone;
  frequency: number;
  concurrencyLimit: number | null;
  callsPerSecond: number | null;
  callerNumberMode: CallerNumberMode;
  agentNumber: string | null;
};

export type MonitorActiveState = {
  id: number;
  isActive: boolean;
  nextRunAt: Date | null;
};

export type MonitorRunItem = {
  id: number;
  scheduledFor: Date;
  status: MonitorRunStatus;
  errorMessage: string | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  resultId: number | null;
  projectId: number;
};

export type MonitorAgentOption = {
  id: number;
  name: string;
  phoneNumber: string | null;
};

export type MonitorScenarioOption = {
  id: number;
  name: string;
};

export type MonitorScenarioFolder = {
  key: string;
  name: string;
  scenarios: MonitorScenarioOption[];
};

export type MonitorScenarioTree = {
  folders: MonitorScenarioFolder[];
  scenarioCount: number;
};
