import 'server-only';

import { DEFAULT_MAX_TOKENS } from '@/server/ai/constants';
import { isAiConfigured } from '@/server/ai/is-ai-configured';
import type { GenerateTextArgs } from '@/server/ai/types';
import { assertNotRefused } from '@/server/ai/utils/assert-not-refused';
import { getAiClient, getAiModel } from '@/server/ai/utils/get-ai-client';

export const generateText = async ({
  system,
  prompt,
  maxTokens = DEFAULT_MAX_TOKENS,
  mock,
}: GenerateTextArgs): Promise<string> => {
  if (!isAiConfigured()) return mock();
  const message = await getAiClient().messages.create({
    model: getAiModel(),
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
  });
  assertNotRefused(message);
  const text = message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim();
  if (!text) throw new Error('The AI model returned no text.');
  return text;
};
