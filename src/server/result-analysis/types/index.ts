import type {
  CallEvaluationStatus,
  MetricEvalType,
  RunStatus,
} from '@/generated/prisma/enums';
import type { MetricValue } from '@/server/metrics/types';

export interface AnalysisMetricScore {
  metricId: number;
  name: string;
  evalType: MetricEvalType;
  value: MetricValue;
  normalizedScore: number | null;
  explanation: string[];
}

export interface AnalysisFailingCheck {
  metricName: string;
  explanation: string[];
}

export interface AnalysisRun {
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
}

export interface AnalysisInput {
  resultId: number;
  agentName: string;
  agentDescription: string;
  runs: AnalysisRun[];
}

export interface AiSummaryText {
  whatHappened: string;
  whyItHappened: string;
  howToFix: string;
}

export interface FailureReasonDraft {
  description: string;
  runIds: number[];
}

export interface NextStepDraft {
  title: string;
  description: string;
}

export interface WorkflowPathDraft {
  label: string;
  covered: boolean;
}

export interface MetricSummaryDraft {
  metricId: number;
  explanation: string[];
}

export interface ResultAnalysis {
  aiSummary: AiSummaryText | null;
  failureReasons: FailureReasonDraft[];
  nextSteps: NextStepDraft[];
  workflowPaths: WorkflowPathDraft[];
  metricSummaries: MetricSummaryDraft[];
}
