import 'server-only';

import { finishTestCall } from '@/server/agents/test-calls/finish-test-call';
import { CallEventType, CallRefKind } from '@/server/call-engine/constants';
import type {
  CallEvent,
  EndOfCallEvent,
  RecordingLoader,
} from '@/server/call-engine/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { finishRunCall } from '@/server/runs/execution/finish-run-call';

const handleEndOfCall = (
  event: EndOfCallEvent,
  loadRecording: RecordingLoader,
) => {
  if (event.call_ref.kind === CallRefKind.test_call) {
    return finishTestCall({ jobId: event.call_ref.id, event });
  }
  return finishRunCall({ runId: event.call_ref.id, event, loadRecording });
};

const recordCallEvent = (event: CallEvent) =>
  addEventFields({
    call: {
      event_type: event.type,
      ref_kind: event.call_ref.kind,
      ref_id: String(event.call_ref.id),
      provider_call_id: event.provider_call_id,
      ended_reason: event.ended_reason,
      started_at: event.started_at,
      ended_at: event.ended_at,
      turn_count: event.transcript.length,
      has_recording: event.recording_url !== null,
    },
  });

export const handleCallEvent = async (
  event: CallEvent,
  loadRecording: RecordingLoader,
) => {
  recordCallEvent(event);
  switch (event.type) {
    case CallEventType.end_of_call:
      await handleEndOfCall(event, loadRecording);
  }
};
