export const AnalysisStep = {
  summary: 'result_analysis.summary',
  failure_reasons: 'result_analysis.failure_reasons',
  next_steps: 'result_analysis.next_steps',
  workflow_coverage: 'result_analysis.workflow_coverage',
  metric_summaries: 'result_analysis.metric_summaries',
} as const;

export type AnalysisStep = (typeof AnalysisStep)[keyof typeof AnalysisStep];
