export const PredefinedFunction = {
  get_main_agent_interruption: 'get_main_agent_interruption',
  get_testing_agent_interruption: 'get_testing_agent_interruption',
  get_not_early_end_call_metric: 'get_not_early_end_call_metric',
  get_average_pitch: 'get_average_pitch',
  evaluate_customer_satisfaction: 'evaluate_customer_satisfaction',
  detect_silence: 'detect_silence',
  observability_dropoff: 'observability_dropoff',
  evaluate_expected_outcome: 'evaluate_expected_outcome',
  check_gibberish: 'check_gibberish',
  check_hallucination: 'check_hallucination',
  get_humanness_score: 'get_humanness_score',
  get_infrastructure_issues: 'get_infrastructure_issues',
  get_interruption_score: 'get_interruption_score',
  get_latency: 'get_latency',
  spelling_analysis: 'spelling_analysis',
  get_pronunciation_analysis_score: 'get_pronunciation_analysis_score',
  get_relevancy_score_v2: 'get_relevancy_score_v2',
  get_agent_consistency: 'get_agent_consistency',
  sentiment_analysis: 'sentiment_analysis',
  detect_main_agent_speaking_rate_change:
    'detect_main_agent_speaking_rate_change',
  get_testing_agent_barge_index: 'get_testing_agent_barge_index',
  get_talk_ratio: 'get_talk_ratio',
  observability_topics: 'observability_topics',
  detect_stt_accuracy: 'detect_stt_accuracy',
  get_number_of_unnecessary_repetitions:
    'get_number_of_unnecessary_repetitions',
  get_unnecessary_repetitions_score: 'get_unnecessary_repetitions_score',
  get_voice_change_detection: 'get_voice_change_detection',
  get_voice_index_v3: 'get_voice_index_v3',
  check_voicemail: 'check_voicemail',
  get_main_agent_speech_speed: 'get_main_agent_speech_speed',
} as const;

export type PredefinedFunction =
  (typeof PredefinedFunction)[keyof typeof PredefinedFunction];

export const OBSERVABILITY_LOCKED_FUNCTIONS: string[] = [
  PredefinedFunction.evaluate_expected_outcome,
];

export const RUBRIC_BOOLEAN_FUNCTIONS: string[] = [
  PredefinedFunction.evaluate_expected_outcome,
];
