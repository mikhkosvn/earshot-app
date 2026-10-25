import 'server-only';

import { analyzeWavRecording } from '@/server/call-engine/audio/analyze-wav-recording';
import {
  CALL_ENDED_REASON_LABEL,
  RECORDING_CONTENT_TYPE,
} from '@/server/call-engine/constants';
import type {
  CallRecording,
  CallWaveform,
  EndOfCallEvent,
  PlacedCall,
  RecordingFile,
} from '@/server/call-engine/types';

interface DescribedRecording {
  recording: CallRecording | null;
  waveform: CallWaveform | null;
}

const MILLISECONDS_PER_SECOND = 1000;

const describeRecording = (file: RecordingFile | null): DescribedRecording => {
  if (!file) return { recording: null, waveform: null };
  const details = analyzeWavRecording(file.data);
  if (!details) {
    return {
      recording: { ...file, testingChannelIndex: null },
      waveform: null,
    };
  }
  return {
    recording: {
      data: file.data,
      contentType: RECORDING_CONTENT_TYPE,
      testingChannelIndex: details.testingChannelIndex,
    },
    waveform: details.waveform,
  };
};

const secondsBetween = (startedAt: Date, endedAt: Date) =>
  Math.max(
    0,
    (endedAt.getTime() - startedAt.getTime()) / MILLISECONDS_PER_SECOND,
  );

const buildMetadata = (
  event: EndOfCallEvent,
  startedAt: Date,
  endedAt: Date,
) => ({
  ended_reason: CALL_ENDED_REASON_LABEL[event.ended_reason],
  call_ended_at: endedAt.toISOString(),
  call_created_at: startedAt.toISOString(),
  call_started_at: startedAt.toISOString(),
  ringing_duration: event.ringing_seconds,
  provider_call_data: event.provider_call_data,
});

export const toPlacedCall = (
  event: EndOfCallEvent,
  file: RecordingFile | null,
): PlacedCall => {
  const startedAt = new Date(event.started_at);
  const endedAt = new Date(event.ended_at);
  const { recording, waveform } = describeRecording(file);
  return {
    turns: event.transcript.map((turn) => ({
      role: turn.role,
      content: turn.content,
      startTime: turn.start_time,
      endTime: turn.end_time,
    })),
    recording,
    waveform,
    durationSeconds: secondsBetween(startedAt, endedAt),
    endedReason: event.ended_reason,
    startedAt,
    endedAt,
    providerCallId: event.provider_call_id,
    providerCallData: event.provider_call_data,
    metadata: buildMetadata(event, startedAt, endedAt),
  };
};
