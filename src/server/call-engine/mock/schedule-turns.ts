import 'server-only';

import type { Random } from '@/server/call-engine/audio/random';
import {
  CallEndedReason,
  TranscriptRole,
} from '@/server/call-engine/constants';
import type { ConversationScript } from '@/server/call-engine/mock/conversation-script';
import type { TranscriptTurn } from '@/server/call-engine/types';

export interface TurnSchedule {
  turns: TranscriptTurn[];
  durationSeconds: number;
  endedReason: CallEndedReason;
}

export type SpeakingRates = Record<TranscriptRole, number>;

const MIN_TURN_SECONDS = 0.8;

const roundTime = (seconds: number) => Math.round(seconds * 1000) / 1000;

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

const gapBefore = (
  role: TranscriptRole,
  random: Random,
  fastCaller: boolean,
) => {
  if (role === TranscriptRole.main_agent) return random.between(1.5, 2.6);
  if (fastCaller) return random.between(0.2, 0.6);
  return random.between(0.6, 1.4);
};

const endedReasonOf = (role: TranscriptRole) => {
  if (role === TranscriptRole.main_agent)
    return CallEndedReason.main_agent_ended_call;
  return CallEndedReason.testing_agent_ended_call;
};

export const scheduleTurns = ({
  script,
  rates,
  maxDurationSeconds,
  fastCaller,
  random,
}: {
  script: ConversationScript;
  rates: SpeakingRates;
  maxDurationSeconds: number;
  fastCaller: boolean;
  random: Random;
}): TurnSchedule => {
  const turns: TranscriptTurn[] = [];
  let cursor = random.between(0.5, 1.5);
  for (const [index, turn] of script.turns.entries()) {
    const startTime =
      cursor + gapBefore(turn.role, random, fastCaller) * Math.min(index, 1);
    const speaking = Math.max(
      MIN_TURN_SECONDS,
      wordCount(turn.content) / rates[turn.role] + 0.3,
    );
    const endTime = startTime + speaking;
    if (startTime >= maxDurationSeconds) {
      return {
        turns,
        durationSeconds: maxDurationSeconds,
        endedReason: CallEndedReason.max_duration_reached,
      };
    }
    if (endTime > maxDurationSeconds) {
      turns.push({
        role: turn.role,
        content: turn.content,
        startTime: roundTime(startTime),
        endTime: roundTime(maxDurationSeconds),
      });
      return {
        turns,
        durationSeconds: maxDurationSeconds,
        endedReason: CallEndedReason.max_duration_reached,
      };
    }
    turns.push({
      role: turn.role,
      content: turn.content,
      startTime: roundTime(startTime),
      endTime: roundTime(endTime),
    });
    cursor = endTime;
  }
  return {
    turns,
    durationSeconds: roundTime(
      Math.min(maxDurationSeconds, cursor + random.between(0.6, 1.2)),
    ),
    endedReason: endedReasonOf(script.endedBy),
  };
};
