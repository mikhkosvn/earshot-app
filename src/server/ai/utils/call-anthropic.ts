import 'server-only';

import Anthropic, { APIError } from '@anthropic-ai/sdk';

import { AiOperation } from '@/server/ai/constants';
import { readAiTotal } from '@/server/ai/utils/read-ai-total';
import {
  ExternalService,
  STATUS_CODE_OK,
} from '@/server/common/logging/constants';
import {
  addEventFields,
  recordExternalCall,
} from '@/server/common/logging/event-fields';

const ANTHROPIC_CALL = {
  service: ExternalService.anthropic,
  operation: AiOperation.messages_create,
  attempt: 1,
};

const statusOf = (error: unknown) => {
  if (error instanceof APIError) return error.status;
  return undefined;
};

const recordUsage = (message: Anthropic.Message) => {
  addEventFields({
    ai: {
      model: message.model,
      call_count: readAiTotal('call_count') + 1,
      input_tokens: readAiTotal('input_tokens') + message.usage.input_tokens,
      output_tokens: readAiTotal('output_tokens') + message.usage.output_tokens,
      stop_reason: message.stop_reason,
    },
  });
};

export const callAnthropic = async <TMessage extends Anthropic.Message>(
  send: () => Promise<TMessage>,
): Promise<TMessage> => {
  const startedMs = performance.now();
  try {
    const message = await send();
    recordExternalCall({
      ...ANTHROPIC_CALL,
      status_code: STATUS_CODE_OK,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    recordUsage(message);
    return message;
  } catch (error) {
    recordExternalCall({
      ...ANTHROPIC_CALL,
      status_code: statusOf(error),
      duration_ms: Math.round(performance.now() - startedMs),
    });
    throw error;
  }
};
