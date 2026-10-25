import 'server-only';

import type Anthropic from '@anthropic-ai/sdk';

export const assertNotRefused = (message: Anthropic.Message) => {
  if (message.stop_reason === 'refusal') {
    throw new Error('The AI model refused the request.');
  }
  if (message.stop_reason === 'max_tokens') {
    throw new Error('The AI model output reached the token limit.');
  }
};
