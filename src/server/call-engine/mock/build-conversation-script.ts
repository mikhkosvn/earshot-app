import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  type ConversationScript,
  conversationScriptSchema,
} from '@/server/call-engine/mock/conversation-script';
import { buildTemplateScript } from '@/server/call-engine/mock/template-script';
import type { CallVariable, PlaceCallInput } from '@/server/call-engine/types';

const SECONDS_PER_TURN = 7;
const MIN_TURNS = 4;
const MAX_TURNS = 16;

const SYSTEM_PROMPT = [
  'You write realistic phone call transcripts for voice agent tests.',
  'The Main Agent is the voice AI agent under test. The Testing Agent is a simulated caller.',
  'The Testing Agent obeys the evaluator instructions and the personality.',
  'The Main Agent behaves as its description says.',
  'Write spoken sentences only, with no stage directions and no speaker names in the text.',
  'Use role "main_agent" for the Main Agent and "testing_agent" for the Testing Agent.',
  'Set "endedBy" to the role that ends the call.',
].join('\n');

const formatVariables = (variables: CallVariable[]) => {
  if (variables.length === 0) return 'none';
  return variables
    .map((variable) => `${variable.key}=${variable.value}`)
    .join(', ');
};

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

const buildPrompt = (input: PlaceCallInput) =>
  [
    `Call direction: ${input.direction}`,
    `Main Agent name: ${input.agent.name}`,
    `Main Agent language: ${input.agent.language}`,
    `Main Agent description: ${input.agent.description}`,
    `Main Agent variables: ${formatVariables(input.mainAgentVariables)}`,
    `Evaluator name: ${input.evaluator.name}`,
    `Evaluator instructions for the Testing Agent: ${input.evaluator.instructions}`,
    `Expected outcome: ${input.evaluator.expectedOutcome}`,
    `Testing Agent variables: ${formatVariables(input.testingAgentVariables)}`,
    `Testing Agent personality: ${input.personality.name}, gender ${input.personality.gender}, language ${input.personality.language}, speed ${input.personality.speed}, interruption level ${input.personality.interruptionLevel}, background noise ${input.personality.backgroundNoise}`,
    formatOpening(input.evaluator.firstMessage),
    `Write at most ${turnLimit(input.maxDurationSeconds)} turns. The roles alternate.`,
  ].join('\n');

export const buildConversationScript = (
  input: PlaceCallInput,
): Promise<ConversationScript> =>
  generateObject({
    system: SYSTEM_PROMPT,
    prompt: buildPrompt(input),
    schema: conversationScriptSchema,
    maxTokens: 4000,
    mock: () => buildTemplateScript(input),
  });
