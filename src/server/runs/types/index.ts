import type { z } from 'zod';

import type {
  CallerNumberMode,
  CallEvaluationStatus,
  ResultSource,
  RunStatus,
} from '@/generated/prisma/enums';
import type { RunChannel } from '@/server/runs/constants/run-channel';
import type {
  evaluatorSnapshotSchema,
  reevaluateConversationsSchema,
  reevaluateResultSchema,
  resultIdSchema,
  runAgentSchema,
  runDefaultsSchema,
  runSettingsSchema,
  startRunSchema,
  testProfileSnapshotSchema,
  testSuiteRequestSchema,
} from '@/server/runs/schemas';

export type RunSettingsValues = z.input<typeof runSettingsSchema>;
export type StartRunInput = z.input<typeof startRunSchema>;
export type TestSuiteRequestInput = z.input<typeof testSuiteRequestSchema>;
export type ResultIdInput = z.input<typeof resultIdSchema>;
export type ReevaluateResultInput = z.input<typeof reevaluateResultSchema>;
export type ReevaluateConversationsInput = z.input<
  typeof reevaluateConversationsSchema
>;
export type RunDefaultsInput = z.input<typeof runDefaultsSchema>;
export type RunAgentInput = z.input<typeof runAgentSchema>;

export interface CreateRunBatchArgs {
  projectId: number;
  createdById: number | null;
  agentId: number;
  evaluatorIds: number[];
  personalityIds?: number[] | null;
  frequency?: number;
  source: ResultSource;
  name?: string;
  callsPerSecond?: number | null;
  monitorRunId?: number | null;
  testProfileIds?: number[] | null;
  concurrencyLimit?: number | null;
  callerNumberMode?: CallerNumberMode;
  agentNumber?: string | null;
  mockToolIds?: number[] | null;
  apiKeyId?: number | null;
}

export interface CreatedRunBatch {
  resultId: number;
  runIds: number[];
}

export type EvaluatorSnapshot = z.output<typeof evaluatorSnapshotSchema>;

export type TestProfileSnapshot = z.output<typeof testProfileSnapshotSchema>;

export interface RunPlanCase {
  evaluatorId: number | null;
  personalityId: number | null;
  testProfileId: number | null;
  evaluatorSnapshot: EvaluatorSnapshot;
}

export interface RunBatchSettings {
  projectId: number;
  createdById: number | null;
  agentId: number;
  source: ResultSource;
  name: string;
  frequency: number;
  callsPerSecond: number | null;
  concurrencyLimit: number | null;
  callerNumberMode: CallerNumberMode;
  agentNumber: string;
  mockToolIds: number[];
  monitorRunId: number | null;
  apiKeyId: number | null;
}

export interface RunBatchStatusRun {
  id: number;
  evaluatorName: string;
  personalityName: string | null;
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
  errorMessage: string | null;
}

export interface RunBatchStatus {
  resultId: number;
  projectId: number;
  name: string;
  status: RunStatus;
  totalRuns: number;
  finishedRuns: number;
  successRuns: number;
  failedRuns: number;
  runs: RunBatchStatusRun[];
}

export interface RunDefaults {
  agentId: number | null;
  maxConcurrentRuns: number;
}

export interface RunMockTool {
  id: number;
  name: string;
}

export interface SkippedMetric {
  id: number;
  name: string;
}

export interface RunAgentConfiguration {
  agentId: number;
  phoneNumber: string | null;
  mockToolsEnabled: boolean;
  mockTools: RunMockTool[];
  skippedMetrics: SkippedMetric[];
}

export interface SpecIssue {
  path: string;
  message: string;
}

export interface PlanScenario {
  key: string;
  name: string;
  frequency: number;
  runs: number;
  metricCount: number;
  personalityName: string;
}

export interface TestSuitePlan {
  suiteName: string;
  channel: RunChannel;
  agentNumber: string;
  scenarioCount: number;
  totalRuns: number;
  saveScenarios: boolean;
  scenarios: PlanScenario[];
}

export type SpecCheck =
  | { valid: true; errors: []; plan: TestSuitePlan }
  | { valid: false; errors: SpecIssue[]; plan: null };

export interface StartedReevaluation {
  jobId: string;
}

export interface CancelledResult {
  resultId: number;
  cancelledCount: number;
}
