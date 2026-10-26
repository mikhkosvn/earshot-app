import 'server-only';

import { EventOutcome, TriggerType } from '@/lib/logging/constants';
import { CallEngineOperation } from '@/server/call-engine/constants';
import { downloadRecording } from '@/server/call-engine/events/download-recording';
import { handleCallEvent } from '@/server/call-engine/events/handle-call-event';
import {
  parsePubSubPush,
  readPushedCallEvent,
  recordInvalidPush,
} from '@/server/call-engine/events/read-pushed-call-event';
import { verifyPushToken } from '@/server/call-engine/events/verify-push-token';
import {
  EventKind,
  STATUS_CODE_SERVER_ERROR,
} from '@/server/common/logging/constants';
import {
  addEventFields,
  markEventFailure,
  recordCaughtError,
} from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { continueIncomingTrace } from '@/server/common/logging/trace/continue-incoming-trace';

type ParsedPush = ReturnType<typeof parsePubSubPush>;

interface PushedRequest {
  authorization: string | null;
  body: string;
}

const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;

const respond = (statusCode: number) => {
  if (statusCode >= STATUS_CODE_BAD_REQUEST) {
    markEventFailure(statusCode);
    return statusCode;
  }
  addEventFields({ status_code: statusCode, outcome: EventOutcome.success });
  return statusCode;
};

const readPushAttributes = (push: ParsedPush) => {
  if (!push.success) return {};
  return push.data.message.attributes ?? {};
};

const handlePush = async (authorization: string | null, push: ParsedPush) => {
  const verified = await verifyPushToken(authorization);
  if (!verified) return respond(STATUS_CODE_UNAUTHORIZED);
  if (!push.success) {
    recordInvalidPush('message', push.error);
    return respond(STATUS_CODE_BAD_REQUEST);
  }
  addEventFields({
    pubsub: {
      message_id: push.data.message.messageId,
      subscription: push.data.subscription,
      publish_time: push.data.message.publishTime,
      delivery_attempt: push.data.deliveryAttempt,
    },
  });
  const event = readPushedCallEvent(push.data);
  if (!event) return respond(STATUS_CODE_BAD_REQUEST);
  await handleCallEvent(event, downloadRecording);
  return respond(STATUS_CODE_NO_CONTENT);
};

const handlePushSafely = async (
  authorization: string | null,
  push: ParsedPush,
) => {
  try {
    return await handlePush(authorization, push);
  } catch (error) {
    recordCaughtError(error);
    return respond(STATUS_CODE_SERVER_ERROR);
  }
};

export const receivePushedCallEvent = ({
  authorization,
  body,
}: PushedRequest) => {
  const push = parsePubSubPush(body);
  return continueIncomingTrace(readPushAttributes(push), () =>
    runWithEvent(
      {
        kind: EventKind.call_event,
        operation: CallEngineOperation.receive_push,
        trigger: TriggerType.background,
      },
      () => handlePushSafely(authorization, push),
    ),
  );
};
