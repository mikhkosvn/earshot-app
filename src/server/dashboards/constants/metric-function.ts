export const MetricFunction = {
  latency: 'get_latency',
  talkRatio: 'get_talk_ratio',
  infrastructureIssues: 'get_infrastructure_issues',
  interruptionScore: 'get_interruption_score',
  expectedOutcome: 'evaluate_expected_outcome',
  aiInterruptingUser: 'get_main_agent_interruption',
  averagePitch: 'get_average_pitch',
  stopTimeAfterInterruption: 'get_testing_agent_barge_index',
  transcriptionAccuracy: 'detect_stt_accuracy',
  repetitionScore: 'get_unnecessary_repetitions_score',
  topic: 'observability_topics',
  dropoff: 'observability_dropoff',
} as const;

export type MetricFunction =
  (typeof MetricFunction)[keyof typeof MetricFunction];
