import 'server-only';

import { finishTestCall } from '@/server/agents/test-calls/finish-test-call';
import { CallEventType, CallRefKind } from '@/server/call-engine/constants';
import type {
  CallEvent,
  EndOfCallEvent,
  RecordingLoader,
} from '@/server/call-engine/types';
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

export const handleCallEvent = async (
  event: CallEvent,
  loadRecording: RecordingLoader,
) => {
  switch (event.type) {
    case CallEventType.end_of_call:
      await handleEndOfCall(event, loadRecording);
  }
};
