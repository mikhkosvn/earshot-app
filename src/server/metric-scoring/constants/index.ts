export const ScoringSource = {
  simulation: 'simulation',
  observability: 'observability',
  standalone: 'standalone',
} as const;

export type ScoringSource = (typeof ScoringSource)[keyof typeof ScoringSource];

export const RubricLogic = {
  and: 'and',
} as const;

export type RubricLogic = (typeof RubricLogic)[keyof typeof RubricLogic];

export const DEFAULT_CODE_RUNNER_URL = 'http://localhost:8765';

export const CODE_RUNNER_TIMEOUT_SECONDS = 10;

export const CODE_RUNNER_REQUEST_TIMEOUT_MS = 20000;

export const MAX_JUDGE_ROUNDS = 4;

export const DEFAULT_INFRA_TIMEOUT_SECONDS = 10;

export const DEFAULT_SILENCE_SECONDS = 10;

export const INTERRUPTION_OVERLAP_SECONDS = 0.3;

export const REPETITION_SIMILARITY = 0.8;

export const SPEAKING_RATE_CHANGE_RATIO = 0.5;

export const VOICE_CHANGE_RATIO = 0.35;

export const LATENCY_SEARCH_SECONDS = 3;

export const PERCENTILE_POINTS = [25, 50, 75, 90, 95, 99] as const;

export const NOT_SCORED_INPUT = 'Input not scored';

export const MetricScoringStep = {
  score_metric: 'metric_scoring.score_metric',
  recording_load: 'metric_scoring.recording_load',
} as const;

export type MetricScoringStep =
  (typeof MetricScoringStep)[keyof typeof MetricScoringStep];

export const MetricScoringOperation = {
  run_code: 'code.run',
} as const;

export type MetricScoringOperation =
  (typeof MetricScoringOperation)[keyof typeof MetricScoringOperation];
