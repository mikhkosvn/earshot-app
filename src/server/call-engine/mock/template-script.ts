import 'server-only';

import { TranscriptRole } from '@/server/call-engine/constants';
import type { ConversationScript } from '@/server/call-engine/mock/conversation-script';
import type { CallVariable, PlaceCallInput } from '@/server/call-engine/types';

const FIRST_PERSON_REPLACEMENTS: [RegExp, string][] = [
  [/\byou are\b/gi, 'I am'],
  [/\byou're\b/gi, "I'm"],
  [/\byou have\b/gi, 'I have'],
  [/\byou want\b/gi, 'I want'],
  [/\byou need\b/gi, 'I need'],
  [/\byour\b/gi, 'my'],
  [/\byourself\b/gi, 'myself'],
  [/\byou\b/gi, 'I'],
];

const NAME_KEYS = ['full_name', 'name', 'first_name', 'customer_name'];

const sentencesOf = (text: string) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const toFirstPerson = (sentence: string) =>
  FIRST_PERSON_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    sentence,
  );

const ensureSentence = (text: string) => {
  const trimmed = text.trim();
  if (/[.!?]$/.test(trimmed)) return trimmed;
  return `${trimmed}.`;
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const findCallerName = (variables: CallVariable[]) =>
  variables.find((variable) => NAME_KEYS.includes(variable.key.toLowerCase()))
    ?.value;

const QUESTION_VERB_PATTERN = /^(ask|inquire)\s+/i;
const REQUEST_VERB_PATTERN =
  /^(request|book|schedule|cancel|reschedule|order|check|confirm)\b/i;

const toCallerSentence = (sentence: string) => {
  const firstPerson = toFirstPerson(sentence).replace(/[.!?]+$/, '');
  if (QUESTION_VERB_PATTERN.test(firstPerson)) {
    return `Can you tell me ${firstPerson.replace(QUESTION_VERB_PATTERN, '')}?`;
  }
  if (REQUEST_VERB_PATTERN.test(firstPerson)) {
    return `I'd like to ${firstPerson.charAt(0).toLowerCase()}${firstPerson.slice(1)}.`;
  }
  return capitalize(ensureSentence(firstPerson));
};

const callerPurpose = (input: PlaceCallInput) => {
  const [first] = sentencesOf(input.evaluator.instructions);
  if (!first) return "I'd like some help, please.";
  return toCallerSentence(first);
};

const callerDetails = (input: PlaceCallInput) => {
  const name = findCallerName(input.testingAgentVariables);
  const [, second] = sentencesOf(input.evaluator.instructions);
  const detail = second && toCallerSentence(second);
  if (name && detail) return `Sure, my name is ${name}. ${detail}`;
  if (name) return `Sure, my name is ${name}. What are the next steps?`;
  if (detail) return `Of course. ${detail}`;
  return 'Of course. What are the next steps?';
};

const agentGreeting = (input: PlaceCallInput) =>
  `Hello, thank you for calling ${input.agent.name}. How can I help you today?`;

const thanksTo = (name: string | undefined) => {
  if (name) return `Thank you, ${name}.`;
  return 'Thank you.';
};

const agentAnswer = (input: PlaceCallInput) =>
  `${thanksTo(findCallerName(input.testingAgentVariables))} I have noted your request, and I will share the next steps with you now.`;

export const buildTemplateScript = (
  input: PlaceCallInput,
): ConversationScript => {
  const opening = input.evaluator.firstMessage?.trim();
  const turns: ConversationScript['turns'] = [];
  if (opening) {
    turns.push({ role: TranscriptRole.testing_agent, content: opening });
  }
  turns.push(
    { role: TranscriptRole.main_agent, content: agentGreeting(input) },
    { role: TranscriptRole.testing_agent, content: callerPurpose(input) },
    {
      role: TranscriptRole.main_agent,
      content:
        'Sure, I can help with that. Can you give me a few details first?',
    },
    { role: TranscriptRole.testing_agent, content: callerDetails(input) },
    { role: TranscriptRole.main_agent, content: agentAnswer(input) },
    {
      role: TranscriptRole.testing_agent,
      content: 'That sounds good. Thank you for your help. Goodbye.',
    },
    {
      role: TranscriptRole.main_agent,
      content: `You're welcome. Thank you for calling ${input.agent.name}. Have a nice day.`,
    },
  );
  return { turns, endedBy: TranscriptRole.main_agent };
};
