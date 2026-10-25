import 'server-only';

import { handleCallEvent } from '@/server/call-engine/events/handle-call-event';
import { callEventSchema } from '@/server/call-engine/schemas';
import type {
  CallEventPayload,
  RecordingFile,
} from '@/server/call-engine/types';

const MISSING_RECORDING_MESSAGE = 'The mock call has no recording.';

export const deliverMockEvent = (
  payload: CallEventPayload,
  recording: RecordingFile | null,
) =>
  handleCallEvent(callEventSchema.parse(payload), async () => {
    if (!recording) throw new Error(MISSING_RECORDING_MESSAGE);
    return recording;
  });
