import 'server-only';

import { TranscriptRole } from '@/generated/prisma/enums';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import { VOICE_CHANGE_RATIO } from '@/server/metric-scoring/constants';
import {
  channelOf,
  FRAME_SECONDS,
  frameRms,
  HOP_SECONDS,
  SPEECH_RMS_THRESHOLD,
} from '@/server/metric-scoring/predefined/audio/frames';
import type { ScoringConversation } from '@/server/metric-scoring/types';
import { completed, skipped } from '@/server/metric-scoring/utils/outcome';
import { mean, median, round2 } from '@/server/metric-scoring/utils/statistics';
import { transcriptTime } from '@/server/metric-scoring/utils/transcript-time';

const MIN_PITCH_HZ = 60;
const MAX_PITCH_HZ = 400;
const MIN_CORRELATION = 0.5;
const PEAK_SHARE = 0.9;
const NO_RECORDING =
  'No two-channel recording is available for this conversation.';

const framePitch = (
  samples: Int16Array,
  start: number,
  length: number,
  rate: number,
) => {
  const minLag = Math.floor(rate / MAX_PITCH_HZ);
  const maxLag = Math.ceil(rate / MIN_PITCH_HZ);
  if (start + length + maxLag > samples.length) return null;
  const scores: number[] = [];
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let cross = 0;
    let energyA = 0;
    let energyB = 0;
    for (let index = start; index < start + length; index += 1) {
      const a = samples[index];
      const b = samples[index + lag];
      cross += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    scores.push(cross / Math.sqrt(energyA * energyB || 1));
  }
  const best = Math.max(...scores);
  if (best < MIN_CORRELATION) return null;
  const firstStrong = scores.findIndex((score) => score >= best * PEAK_SHARE);
  return rate / (minLag + firstStrong);
};

type TurnPitch = { startTime: number; pitches: number[] };

const turnPitches = (conversation: ScoringConversation): TurnPitch[] => {
  const recording = conversation.recording;
  if (!recording) return [];
  const samples = channelOf(recording, conversation.mainChannelIndex);
  const rate = recording.sampleRate;
  const frame = Math.round(FRAME_SECONDS * rate);
  const hop = Math.round(HOP_SECONDS * rate);
  return conversation.turns.flatMap((turn) => {
    if (turn.role !== TranscriptRole.main_agent) return [];
    if (turn.startTime === null || turn.endTime === null) return [];
    const pitches: number[] = [];
    const end = Math.round(turn.endTime * rate);
    for (
      let start = Math.round(turn.startTime * rate);
      start < end;
      start += hop
    ) {
      if (frameRms(samples, start, frame) < SPEECH_RMS_THRESHOLD) continue;
      const pitch = framePitch(samples, start, frame, rate);
      if (pitch !== null) pitches.push(pitch);
    }
    if (pitches.length === 0) return [];
    return [{ startTime: turn.startTime, pitches }];
  });
};

export const scoreAveragePitch = (conversation: ScoringConversation) => {
  const turns = turnPitches(conversation);
  if (turns.length === 0) return skipped([NO_RECORDING]);
  const all = turns.flatMap((turn) => turn.pitches);
  const graph = turns.map((turn) => ({
    pitch: round2(mean(turn.pitches) ?? 0),
    speaker: TranscriptRoleLabel[TranscriptRole.main_agent],
    start_time: round2(turn.startTime),
  }));
  const average = round2(mean(all) ?? 0);
  return completed(
    average,
    [
      `The average pitch of the main agent was ${average} Hz over ${all.length} voiced frames.`,
    ],
    {
      graph_data: graph,
      average_of_turns: round2(mean(graph.map((point) => point.pitch)) ?? 0),
    },
  );
};

export const scoreVoiceChange = (conversation: ScoringConversation) => {
  const turns = turnPitches(conversation);
  if (turns.length === 0) return skipped([NO_RECORDING]);
  const perTurn = turns.map((turn) => ({
    startTime: turn.startTime,
    pitch: median(turn.pitches) ?? 0,
  }));
  const typical = median(perTurn.map((turn) => turn.pitch)) ?? 0;
  const changed = perTurn.find(
    (turn) => Math.abs(turn.pitch - typical) > typical * VOICE_CHANGE_RATIO,
  );
  if (changed) {
    return completed(false, [
      `The main agent voice changed at ${transcriptTime(changed.startTime)}: ${round2(changed.pitch)} Hz against a typical ${round2(typical)} Hz.`,
    ]);
  }
  return completed(true, [
    `The main agent voice stayed near ${round2(typical)} Hz for the whole call.`,
  ]);
};
