import 'server-only';

import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';
import {
  scoreAveragePitch,
  scoreVoiceChange,
} from '@/server/metric-scoring/predefined/audio/pitch';
import { scoreExpectedOutcome } from '@/server/metric-scoring/predefined/model/expected-outcome';
import {
  configurationOutcome,
  MODEL_METRICS,
  needsConfiguration,
  scoreModelMetric,
} from '@/server/metric-scoring/predefined/model/model-metrics';
import {
  scoreRepetitionCount,
  scoreRepetitionScore,
} from '@/server/metric-scoring/predefined/text/repetition';
import {
  scoreSpeakingRateChange,
  scoreWordsPerMinute,
} from '@/server/metric-scoring/predefined/text/speech-rate';
import {
  scoreInterruptionScore,
  scoreMainAgentInterruptions,
  scoreStopTimeAfterInterruption,
  scoreTestingAgentInterruptions,
} from '@/server/metric-scoring/predefined/timing/interruptions';
import { scoreLatency } from '@/server/metric-scoring/predefined/timing/latency';
import {
  scoreInfrastructureIssues,
  scoreSilence,
} from '@/server/metric-scoring/predefined/timing/silence';
import { scoreTalkRatio } from '@/server/metric-scoring/predefined/timing/talk-ratio';
import type {
  ScoreOutcome,
  ScoringContext,
} from '@/server/metric-scoring/types';

type PredefinedScorer = (
  context: ScoringContext,
) => ScoreOutcome | Promise<ScoreOutcome>;

const COMPUTED_SCORERS: Partial<Record<string, PredefinedScorer>> = {
  [PredefinedFunction.get_latency]: ({ conversation }) =>
    scoreLatency(conversation),
  [PredefinedFunction.get_main_agent_interruption]: ({ conversation }) =>
    scoreMainAgentInterruptions(conversation),
  [PredefinedFunction.get_testing_agent_interruption]: ({ conversation }) =>
    scoreTestingAgentInterruptions(conversation),
  [PredefinedFunction.get_interruption_score]: ({ conversation }) =>
    scoreInterruptionScore(conversation),
  [PredefinedFunction.get_testing_agent_barge_index]: ({ conversation }) =>
    scoreStopTimeAfterInterruption(conversation),
  [PredefinedFunction.get_talk_ratio]: ({ conversation }) =>
    scoreTalkRatio(conversation),
  [PredefinedFunction.detect_silence]: ({ conversation, metric }) =>
    scoreSilence(conversation, metric),
  [PredefinedFunction.get_infrastructure_issues]: ({ conversation, metric }) =>
    scoreInfrastructureIssues(conversation, metric),
  [PredefinedFunction.get_average_pitch]: ({ conversation }) =>
    scoreAveragePitch(conversation),
  [PredefinedFunction.get_voice_change_detection]: ({ conversation }) =>
    scoreVoiceChange(conversation),
  [PredefinedFunction.get_number_of_unnecessary_repetitions]: ({
    conversation,
  }) => scoreRepetitionCount(conversation),
  [PredefinedFunction.get_unnecessary_repetitions_score]: ({ conversation }) =>
    scoreRepetitionScore(conversation),
  [PredefinedFunction.get_main_agent_speech_speed]: ({ conversation }) =>
    scoreWordsPerMinute(conversation),
  [PredefinedFunction.detect_main_agent_speaking_rate_change]: ({
    conversation,
  }) => scoreSpeakingRateChange(conversation),
  [PredefinedFunction.evaluate_expected_outcome]: scoreExpectedOutcome,
};

export const hasPredefinedScorer = (functionName: string | null) => {
  if (!functionName) return false;
  return (
    functionName in COMPUTED_SCORERS ||
    functionName in MODEL_METRICS ||
    needsConfiguration(functionName)
  );
};

export const runPredefined = async (
  functionName: string,
  context: ScoringContext,
): Promise<ScoreOutcome> => {
  const computed = COMPUTED_SCORERS[functionName];
  if (computed) return computed(context);
  const model = MODEL_METRICS[functionName];
  if (model) return scoreModelMetric(context, model);
  return configurationOutcome();
};
