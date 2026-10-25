import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  type ConversationScript,
  conversationScriptSchema,
} from '@/server/call-engine/mock/conversation-script';
import { buildTemplateScript } from '@/server/call-engine/mock/template-script';
import type { CallerSetup, StartCallRequest } from '@/server/call-engine/types';

const SECONDS_PER_TURN = 7;
const MIN_TURNS = 4;
const MAX_TURNS = 16;
const NORMAL_SPEED = 1;

const SYSTEM_PROMPT = [
  'You write realistic phone call transcripts for voice agent tests.',
  'The Main Agent is the voice AI agent under test. The Testing Agent is a simulated caller.',
  'The Testing Agent obeys its instructions and its personality.',
  'The Main Agent is a helpful business agent. Its replies fit the request of the caller.',
  'Write spoken sentences only, with no stage directions and no speaker names in the text.',
  'Use role "main_agent" for the Main Agent and "testing_agent" for the Testing Agent.',
  'Set "endedBy" to the role that ends the call.',
].join('\n');

const formatVariables = (variables: Record<string, string>) => {
  const entries = Object.entries(variables);
  if (entries.length === 0) return 'none';
  return entries.map(([key, value]) => `${key}=${value}`).join(', ');
};

const formatPersonality = (caller: CallerSetup) =>
  [
    caller.prompt.trim(),
    `accent ${caller.accent ?? 'none'}`,
    `speed ${caller.speed ?? NORMAL_SPEED}`,
    `interruption level ${caller.interruption_level}`,
    `background noise ${caller.background_noise}`,
  ]
    .filter((part) => part.length > 0)
    .join(', ');

const formatOpening = (firstMessage: string | null) => {
  if (firstMessage?.trim()) {
    return `The Testing Agent speaks first and says exactly: "${firstMessage.trim()}"`;
  }
  return 'The Main Agent speaks first with a greeting.';
};

const turnLimit = (maxDurationSeconds: number) =>
  Math.max(
    MIN_TURNS,
    Math.min(MAX_TURNS, Math.floor(maxDurationSeconds / SECONDS_PER_TURN)),
  );

const buildPrompt = (request: StartCallRequest) =>
  [
    `Call direction: ${request.direction}`,
    `Call language: ${request.caller.language}`,
    `Instructions for the Testing Agent: ${request.caller.instructions}`,
    `Testing Agent variables: ${formatVariables(request.caller.variables)}`,
    `Testing Agent personality: ${formatPersonality(request.caller)}`,
    formatOpening(request.caller.first_message),
    `Write at most ${turnLimit(request.max_duration_seconds)} turns. The roles alternate.`,
  ].join('\n');

export const buildConversationScript = (
  request: StartCallRequest,
): Promise<ConversationScript> =>
  generateObject({
    system: SYSTEM_PROMPT,
    prompt: buildPrompt(request),
    schema: conversationScriptSchema,
    maxTokens: 4000,
    mock: () => buildTemplateScript(request),
  });
