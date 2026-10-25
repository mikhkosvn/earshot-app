import 'server-only';

import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import type { z } from 'zod';

import { DEFAULT_MAX_TOKENS } from '@/server/ai/constants';
import { isAiConfigured } from '@/server/ai/is-ai-configured';
import type { GenerateObjectArgs } from '@/server/ai/types';
import { assertNotRefused } from '@/server/ai/utils/assert-not-refused';
import { getAiClient, getAiModel } from '@/server/ai/utils/get-ai-client';

export const generateObject = async <TSchema extends z.ZodType>({
  system,
  prompt,
  schema,
  maxTokens = DEFAULT_MAX_TOKENS,
  mock,
}: GenerateObjectArgs<TSchema>): Promise<z.output<TSchema>> => {
  if (!isAiConfigured()) return mock();
  const message = await getAiClient().messages.parse({
    model: getAiModel(),
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
    output_config: { format: zodOutputFormat(schema) },
  });
  assertNotRefused(message);
  if (message.parsed_output === null || message.parsed_output === undefined) {
    throw new Error(
      'The AI model returned output that does not match the schema.',
    );
  }
  return schema.parse(message.parsed_output);
};
