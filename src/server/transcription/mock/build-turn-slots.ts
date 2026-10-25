import 'server-only';

import type { DecodedWav } from '@/server/call-engine/audio/decode-wav';
import {
  TESTING_CHANNEL_INDEX,
  TranscriptRole,
} from '@/server/call-engine/constants';
import { SAME_SPEAKER_MERGE_SECONDS } from '@/server/transcription/constants';
import { detectSpeechSegments } from '@/server/transcription/mock/detect-speech-segments';
import type { TurnSlot } from '@/server/transcription/types';

const roleOfChannel = (channelIndex: number) => {
  if (channelIndex === TESTING_CHANNEL_INDEX) {
    return TranscriptRole.testing_agent;
  }
  return TranscriptRole.main_agent;
};

const alternateRole = (index: number) => {
  if (index % 2 === 0) return TranscriptRole.main_agent;
  return TranscriptRole.testing_agent;
};

const mergeSameSpeaker = (slots: TurnSlot[]) =>
  slots.reduce<TurnSlot[]>((merged, slot) => {
    const previous = merged.at(-1);
    if (
      previous?.role === slot.role &&
      slot.startTime - previous.endTime <= SAME_SPEAKER_MERGE_SECONDS
    ) {
      previous.endTime = Math.max(previous.endTime, slot.endTime);
      return merged;
    }
    merged.push({ ...slot });
    return merged;
  }, []);

const stereoSlots = (recording: DecodedWav) =>
  recording.channels
    .flatMap((samples, channelIndex) =>
      detectSpeechSegments(samples, recording.sampleRate).map(
        (segment): TurnSlot => ({
          role: roleOfChannel(channelIndex),
          startTime: segment.start,
          endTime: segment.end,
        }),
      ),
    )
    .toSorted((left, right) => left.startTime - right.startTime);

const monoSlots = (recording: DecodedWav) =>
  detectSpeechSegments(recording.channels[0], recording.sampleRate).map(
    (segment, index): TurnSlot => ({
      role: alternateRole(index),
      startTime: segment.start,
      endTime: segment.end,
    }),
  );

export const buildTurnSlots = (recording: DecodedWav) => {
  if (recording.channels.length >= 2) {
    return mergeSameSpeaker(stereoSlots(recording));
  }
  return monoSlots(recording);
};
