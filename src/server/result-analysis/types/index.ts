import type {
  CallEvaluationStatus,
  MetricEvalType,
  RunStatus,
} from '@/generated/prisma/enums';
import type { MetricValue } from '@/server/metrics/types';

export type AnalysisMetricScore = {
  metricId: number;
  name: string;
  evalType: MetricEvalType;
  value: MetricValue;
  normalizedScore: number | null;
  explanation: string[];
};

export type AnalysisFailingCheck = {
  metricName: string;
  explanation: string[];
};

export type AnalysisRun = {
  id: number;
  evaluatorName: string;
  instructions: string;
  expectedOutcome: string | null;
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
  errorMessage: string | null;
  success: boolean;
  failed: boolean;
  transcript: string;
  failingChecks: AnalysisFailingCheck[];
  metrics: AnalysisMetricScore[];
};

export type AnalysisInput = {
  resultId: number;
  agentName: string;
  agentDescription: string;
  runs: AnalysisRun[];
};

export type AiSummaryText = {
  whatHappened: string;
  whyItHappened: string;
  howToFix: string;
};

export type FailureReasonDraft = {
  description: string;
  runIds: number[];
};

export type NextStepDraft = {
  title: string;
  description: string;
};

export type WorkflowPathDraft = {
  label: string;
  covered: boolean;
};

export type MetricSummaryDraft = {
  metricId: number;
  explanation: string[];
};

export type ResultAnalysis = {
  aiSummary: AiSummaryText | null;
  failureReasons: FailureReasonDraft[];
  nextSteps: NextStepDraft[];
  workflowPaths: WorkflowPathDraft[];
  metricSummaries: MetricSummaryDraft[];
};
