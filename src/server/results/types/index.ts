import type { z } from 'zod';

import type {
  AiSummaryStatus,
  CallEvaluationStatus,
  MetricEvalType,
  RunStatus,
} from '@/generated/prisma/enums';
import type { RubricVerdict } from '@/server/metric-scoring/types';
import type { MetricValue } from '@/server/metrics/types';
import type { ResultRunType } from '@/server/results/constants/result-list';
import type { TileUnit } from '@/server/results/constants/tile-unit';
import type {
  deleteResultsSchema,
  deleteRunsSchema,
  exportResultsSchema,
  listResultsSchema,
  listRunsSchema,
  projectScopeSchema,
  renameResultSchema,
  resultFiltersSchema,
  resultIdSchema,
  runIdSchema,
} from '@/server/results/schemas';

export type ResultFilters = z.output<typeof resultFiltersSchema>;
export type ListResultsInput = z.input<typeof listResultsSchema>;
export type ExportResultsInput = z.input<typeof exportResultsSchema>;
export type ListRunsInput = z.input<typeof listRunsSchema>;
export type ProjectScopeInput = z.input<typeof projectScopeSchema>;
export type ResultIdInput = z.input<typeof resultIdSchema>;
export type RunIdInput = z.input<typeof runIdSchema>;
export type DeleteResultsInput = z.input<typeof deleteResultsSchema>;
export type DeleteRunsInput = z.input<typeof deleteRunsSchema>;
export type RenameResultInput = z.input<typeof renameResultSchema>;

export interface NamedRef {
  id: number;
  name: string;
}

export interface AgentRef extends NamedRef {
  versionLabel: string | null;
}

export interface ResultListRow {
  id: number;
  name: string;
  evaluatorCount: number;
  totalRuns: number;
  completedRuns: number;
  agent: AgentRef | null;
  runType: ResultRunType;
  status: RunStatus;
  successRate: number | null;
  createdAt: Date;
}

export interface ResultListPage {
  count: number;
  rows: ResultListRow[];
}

export interface ResultFilterOptions {
  agents: NamedRef[];
  evaluators: NamedRef[];
  tags: string[];
}

export interface MetricColumn {
  id: number;
  name: string;
  evalType: MetricEvalType;
  functionName: string | null;
}

export interface RunMetricCell {
  value: MetricValue;
  firstTurn: number | null;
  p50: number | null;
  p99: number | null;
}

export interface RunRow {
  id: number;
  resultId: number;
  conversationId: number;
  evaluator: { id: number | null; name: string };
  startedAt: Date;
  durationSeconds: number | null;
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
  personality: NamedRef | null;
  agent: AgentRef | null;
  testProfile: NamedRef | null;
  testingNumber: string | null;
  endedReason: string | null;
  ringingDuration: number | null;
  feedback: string | null;
  metrics: Record<number, RunMetricCell>;
}

export interface RunListPage {
  count: number;
  rows: RunRow[];
  metricColumns: MetricColumn[];
}

export interface ResultStatusView {
  id: number;
  status: RunStatus;
  total: number;
  completed: number;
  success: number;
  failed: number;
  aiSummaryStatus: AiSummaryStatus | null;
}

export interface TileRun {
  runId: number;
  value: MetricValue;
  passed: boolean | null;
}

export interface ResultMetricTile {
  metricId: number;
  name: string;
  description: string;
  evalType: MetricEvalType;
  functionName: string | null;
  unit: TileUnit;
  aggregate: number | null;
  text: string | null;
  passed: boolean;
  thresholdText: string | null;
  inRubric: boolean;
  runs: TileRun[];
}

export interface ResultTagTile {
  tag: string;
  successRate: number;
  runIds: number[];
}

export interface ResultRunRef {
  runId: number;
  startedAt: Date;
  personalityName: string | null;
  evaluatorName: string;
}

export interface ResultLatencyStats {
  p50: number;
  p95: number;
  p99: number;
  mean: number;
}

export interface ResultRingingStats {
  p50: number;
  mean: number;
}

export interface ResultReportMetric {
  metricId: number;
  name: string;
  score: number;
  explanation: string[];
}

export interface ResultDetail {
  id: number;
  projectId: number;
  name: string;
  status: RunStatus;
  createdAt: Date;
  completedAt: Date | null;
  agent: AgentRef | null;
  runType: ResultRunType;
  counts: {
    total: number;
    completed: number;
    success: number;
    failed: number;
    inProgress: number;
  };
  successRate: number;
  aiSummary: {
    status: AiSummaryStatus | null;
    whatHappened: string | null;
    whyItHappened: string | null;
    howToFix: string | null;
  };
  workflow: {
    generated: boolean;
    paths: { label: string; covered: boolean }[];
  };
  rubricTiles: ResultMetricTile[];
  otherTiles: ResultMetricTile[];
  tagTiles: ResultTagTile[];
  callStats: {
    failedToConnect: number;
    latency: ResultLatencyStats | null;
    ringing: ResultRingingStats | null;
  };
  runIndex: ResultRunRef[];
  reportMetrics: ResultReportMetric[];
}

export interface RunDetail {
  id: number;
  resultId: number;
  conversationId: number;
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
  feedback: string | null;
  errorMessage: string | null;
  evaluator: RunRow['evaluator'];
  agent: AgentRef | null;
  personality: NamedRef | null;
  testProfile: NamedRef | null;
  startedAt: Date;
  inbound: boolean;
  testingNumber: string | null;
  rubric: RubricVerdict;
}
