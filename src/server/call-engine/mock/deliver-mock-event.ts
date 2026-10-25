import 'server-only';

import { TriggerType } from '@/lib/logging/constants';
import { CallEngineOperation } from '@/server/call-engine/constants';
import { handleCallEvent } from '@/server/call-engine/events/handle-call-event';
import { callEventSchema } from '@/server/call-engine/schemas';
import type {
  CallEventPayload,
  RecordingFile,
} from '@/server/call-engine/types';
import { EventKind } from '@/server/common/logging/constants';
import { recordStepFailure } from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { continueIncomingTrace } from '@/server/common/logging/trace/continue-incoming-trace';
import type { TraceContext } from '@/server/common/logging/types';

const MISSING_RECORDING_MESSAGE = 'The mock call has no recording.';
const MOCK_CALL_STEP = 'mock_call';

interface MockDelivery {
  payload: CallEventPayload;
  recording: RecordingFile | null;
  traceContext: TraceContext | undefined;
  failure?: unknown;
}

const deliver = async ({ payload, recording, failure }: MockDelivery) => {
  if (failure !== undefined) recordStepFailure(MOCK_CALL_STEP, failure);
  await handleCallEvent(callEventSchema.parse(payload), async () => {
    if (!recording) throw new Error(MISSING_RECORDING_MESSAGE);
    return recording;
  });
};

export const deliverMockEvent = (delivery: MockDelivery) =>
  continueIncomingTrace(delivery.traceContext ?? {}, () =>
    runWithEvent(
      {
        kind: EventKind.call_event,
        operation: CallEngineOperation.deliver_mock_event,
        trigger: TriggerType.background,
      },
      () => deliver(delivery),
    ),
  );
