import 'server-only';

import Anthropic from '@anthropic-ai/sdk';

import { DEFAULT_AI_MODEL } from '@/server/ai/constants';

const globalForAi = globalThis as unknown as {
  earshotAnthropic: Anthropic | undefined;
};

export const getAiModel = () => process.env.AI_MODEL || DEFAULT_AI_MODEL;

export const getAiClient = () => {
  globalForAi.earshotAnthropic ??= new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  return globalForAi.earshotAnthropic;
};
