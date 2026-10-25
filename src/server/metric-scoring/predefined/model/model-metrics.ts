import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { transcriptJson } from '@/server/metric-scoring/context/template-data';
import { askJudge } from '@/server/metric-scoring/judge/ask-judge';
import {
  excerpt,
  type JudgeResult,
} from '@/server/metric-scoring/judge/judge-mock';
import type {
  ScoreOutcome,
  ScoringContext,
  ScoringConversation,
} from '@/server/metric-scoring/types';
import { completed, skipped } from '@/server/metric-scoring/utils/outcome';
import { stableRandom } from '@/server/metric-scoring/utils/stable-random';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';

type ModelMetric = {
  instruction: string;
  mock: (conversation: ScoringConversation, random: number) => JudgeResult;
};

const RATING_BASE = 3.5;
const RATING_SPREAD = 1.5;
const HALF_STEPS = 2;
const PASS_SHARE = 0.85;

const rating = (random: number) =>
  Math.round((RATING_BASE + random * RATING_SPREAD) * HALF_STEPS) / HALF_STEPS;

const lastTurn = (conversation: ScoringConversation, role: TranscriptRole) =>
  conversation.turns.findLast((turn) => turn.role === role) ?? null;

const turnNote = (
  conversation: ScoringConversation,
  role: TranscriptRole,
  text: string,
) => {
  const turn = lastTurn(conversation, role);
  if (!turn) return text;
  return `${text} (${transcriptTime(turn.startTime)}: '${excerpt(turn.content)}')`;
};

const allText = (conversation: ScoringConversation, role: TranscriptRole) =>
  conversation.turns
    .filter((turn) => turn.role === role)
    .map((turn) => turn.content.toLowerCase())
    .join(' ');

const SENTIMENT_WORDS: { value: string; words: string[] }[] = [
  { value: 'Angry', words: ['angry', 'ridiculous', 'unacceptable', 'furious'] },
  {
    value: 'Disappointed',
    words: ['disappointed', 'unfortunately', 'frustrat', 'not helpful'],
  },
  {
    value: 'Happy',
    words: ['thank', 'great', 'perfect', 'wonderful', 'helpful'],
  },
];

const sentimentOf = (conversation: ScoringConversation) => {
  const text = allText(conversation, TranscriptRole.testing_agent);
  return (
    SENTIMENT_WORDS.find((entry) =>
      entry.words.some((word) => text.includes(word)),
    )?.value ?? 'Neutral'
  );
};

const VOICEMAIL_PHRASES = [
  'leave a message',
  'after the tone',
  'voicemail',
  'not available',
];
const VOICEMAIL_SCORE = 5;

const voicemailScore = (conversation: ScoringConversation) => {
  const text = allText(conversation, TranscriptRole.testing_agent);
  if (VOICEMAIL_PHRASES.some((phrase) => text.includes(phrase))) {
    return VOICEMAIL_SCORE;
  }
  return 0;
};

const binaryMock =
  (passText: string, failText: string, role: TranscriptRole) =>
  (conversation: ScoringConversation, random: number): JudgeResult => {
    if (random < PASS_SHARE) {
      return {
        result: true,
        explanation: [turnNote(conversation, role, passText)],
      };
    }
    return {
      result: false,
      explanation: [turnNote(conversation, role, failText)],
    };
  };

const ratingMock =
  (text: string) =>
  (conversation: ScoringConversation, random: number): JudgeResult => ({
    result: rating(random),
    explanation: [turnNote(conversation, TranscriptRole.main_agent, text)],
  });

export const MODEL_METRICS: Record<string, ModelMetric> = {
  get_not_early_end_call_metric: {
    instruction:
      'Return true if the main agent did not end the call early: either the testing agent ended it, or the main agent ended it after the concern of the testing agent was resolved.',
    mock: binaryMock(
      'The call ended after the request of the testing agent was handled.',
      'The main agent ended the call while the request was still open.',
      TranscriptRole.main_agent,
    ),
  },
  evaluate_customer_satisfaction: {
    instruction:
      'Rate the satisfaction of the testing agent from 0 to 5 and give the reason for any dissatisfaction.',
    mock: ratingMock(
      'The testing agent sounded satisfied at the end of the call.',
    ),
  },
  check_gibberish: {
    instruction:
      'Return true if the main agent speech has no gibberish (no broken words, no random characters, no unreadable phrases).',
    mock: binaryMock(
      'The main agent speech has no gibberish.',
      'The main agent produced a garbled phrase.',
      TranscriptRole.main_agent,
    ),
  },
  get_humanness_score: {
    instruction: 'Rate from 1 to 5 how human the main agent sounds.',
    mock: ratingMock('The main agent used natural phrasing and turn taking.'),
  },
  get_relevancy_score_v2: {
    instruction:
      'Return true if every response of the main agent is relevant to what the testing agent said.',
    mock: binaryMock(
      'Every main agent response addressed the testing agent request.',
      'A main agent response did not address the testing agent request.',
      TranscriptRole.main_agent,
    ),
  },
  get_agent_consistency: {
    instruction:
      'Return true if the main agent responses stay consistent with each other for the whole call.',
    mock: binaryMock(
      'The main agent did not contradict itself.',
      'The main agent contradicted an earlier statement.',
      TranscriptRole.main_agent,
    ),
  },
  sentiment_analysis: {
    instruction:
      'Decide the overall sentiment of the testing agent toward the main agent: Happy, Angry, Neutral, or Disappointed.',
    mock: (conversation) => ({
      result: sentimentOf(conversation),
      explanation: [
        turnNote(
          conversation,
          TranscriptRole.testing_agent,
          `The testing agent sounded ${sentimentOf(conversation).toLowerCase()}.`,
        ),
      ],
    }),
  },
  detect_stt_accuracy: {
    instruction:
      'Rate from 0 to 5 how accurately the transcript captures what was said. Penalize garbled or missing words.',
    mock: ratingMock('The transcript reads cleanly with no garbled words.'),
  },
  get_voice_index_v3: {
    instruction:
      'Rate from 0 to 5 the clarity and the tone consistency of the main agent voice.',
    mock: ratingMock('The main agent voice was clear with a steady tone.'),
  },
  check_voicemail: {
    instruction: 'Score 5 if the call reached a voicemail system, else 0.',
    mock: (conversation) => {
      const score = voicemailScore(conversation);
      if (score > 0) {
        return {
          result: score,
          explanation: ['The call reached a voicemail greeting.'],
        };
      }
      return {
        result: 0,
        explanation: ['A live caller answered, not a voicemail system.'],
      };
    },
  },
};

const CONFIGURATION_FUNCTIONS = [
  'observability_dropoff',
  'observability_topics',
  'check_hallucination',
  'spelling_analysis',
  'get_pronunciation_analysis_score',
];

export const needsConfiguration = (functionName: string) =>
  CONFIGURATION_FUNCTIONS.includes(functionName);

export const configurationOutcome = () =>
  skipped([
    'This metric needs configuration on the agent before it can score calls.',
  ]);

export const scoreModelMetric = async (
  context: ScoringContext,
  model: ModelMetric,
): Promise<ScoreOutcome> => {
  const random = stableRandom(context.metric.id, context.conversation.id);
  const judged = await askJudge({
    metric: context.metric,
    prompt: [
      `Metric: ${context.metric.name}`,
      model.instruction,
      `Transcript Json:\n${JSON.stringify(transcriptJson(context.conversation))}`,
    ].join('\n\n'),
    mock: () => model.mock(context.conversation, random),
  });
  if (judged.result === null) return skipped(judged.explanation);
  return completed(judged.result, judged.explanation);
};
