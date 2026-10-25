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
const MAX_CALLER_STEPS = 4;
const SHARED_VALUE_PREFIX = "It's ";
const DEFAULT_PURPOSE = 'I need some help, please.';

const TAG_PATTERN = /<\/?[a-z_][\w-]*>/gi;
const VARIABLE_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;
const LINE_SPLIT_PATTERN = /\n|(?<=[.!?])\s+|\s+(?=-\s)/;
const BULLET_PATTERN = /^\s*(?:[-*•]|\d+[.)])\s*/;
const SAY_VERB_PATTERN =
  /^(?:state|say|tell (?:the agent|them)|mention|reply|respond with|answer with)\s+(?:that\s+)?/i;
const QUESTION_VERB_PATTERN =
  /^(?:ask|inquire)\s+(?:the agent\s+)?(?:about\s+)?/i;
const REQUEST_VERB_PATTERN =
  /^(?:request|book|schedule|cancel|reschedule|order|check|confirm|move|change|return|update)\b/i;
const IDENTITY_PATTERN = /^you are\b/i;
const CALLING_PURPOSE_PATTERN = /\bcalling\b.*?\bto\s+(.+)$/i;
const TRAILING_CONDITION_PATTERN =
  /,?\s+\b(?:when|if|after|once|as soon as|before|until)\b.*$/i;
const LEADING_CONDITION_PATTERN =
  /^(?:when|if|after|once|as soon as|before|until)\b[^,]*,\s*/i;
const DIRECTIVE_PATTERN =
  /^(?:begin|be|act|behave|remain|stay|follow|wait|let|keep|do not|don't|never|always|end|hang up|correct|try|pretend|speak|use|insist|refuse|accept|agree|interrupt|explain)\b/i;
const SHARE_VERB_PATTERN = /^(?:provide|give|share|spell out)\b\s*/i;
const THIRD_PERSON_PATTERN =
  /^(?:a|an|the) (?:[\w-]+ )?(?:caller|testing agent|main agent|agent|customer|user|patient|person)\b/i;
const THIRD_PERSON_PURPOSE_PATTERN =
  /^(?:a|an|the) (?:[\w-]+ )?(?:caller|customer|user|patient|person) (?:calls|is calling|wants|needs) to\s+(.+)$/i;
const GENERIC_STATEMENT_PATTERN =
  /^(?:my|the) (?:request|issue|problem|question|details|information|reason)\b/i;
const TRAILING_DIRECTIVE_PATTERN =
  /,?\s+(?:and|then)\s+(?:then\s+)?(?:end|hang up|wait|stop|leave)\b.*$/i;
const LEADING_ADVERB_PATTERN =
  /^(?:at first|first|then|next|finally|also)\b,?\s*/i;
const QUESTION_WORD_PATTERN =
  /^(?:whether|if|what|when|where|which|who|how|why)\b/i;
const YES_NO_QUESTION_PATTERN =
  /^(?:ask|inquire)\s+(?:the agent\s+)?(?:if|whether)\b/i;
const YES_NO_TOPIC_PATTERN = /^(?:if|whether)\s+/i;
const DIRECT_CLAUSE_PATTERN =
  /^(you|it|they|we) (can|could|will|would|is|are|does|do|has|have|should)\b\s*(.*)$/i;
const CALLER_OBJECT_REPLACEMENTS: [RegExp, string][] = [
  [/\byourself\b/gi, 'myself'],
  [/\byour\b/gi, 'my'],
  [/\byou\b/gi, 'me'],
  [/\bthe agent\b/gi, 'you'],
];

const VALUE_START = '\u0001';
const VALUE_END = '\u0002';
const MARKED_VALUE_PATTERN = /\u0001([^\u0002]*)\u0002/g;
const MARKER_PATTERN = /[\u0001\u0002]/g;

const variableValue = (input: PlaceCallInput, path: string) => {
  const key = path.split('.').at(-1) ?? path;
  const variables = [
    ...input.testingAgentVariables,
    ...input.mainAgentVariables,
  ];
  const value = variables.find((variable) => variable.key === key)?.value;
  if (!value) return '';
  return `${VALUE_START}${value}${VALUE_END}`;
};

const instructionLines = (input: PlaceCallInput) =>
  input.evaluator.instructions
    .replace(TAG_PATTERN, '\n')
    .replace(VARIABLE_PATTERN, (_, path: string) => variableValue(input, path))
    .split(LINE_SPLIT_PATTERN)
    .map((line) => line.replace(BULLET_PATTERN, '').trim())
    .filter((line) => line.length > 0 && !line.endsWith(':'));

const markedValues = (text: string) =>
  [...text.matchAll(MARKED_VALUE_PATTERN)].map((match) => match[1]);

const unmark = (text: string) => text.replace(MARKER_PATTERN, '');

const toFirstPerson = (sentence: string) =>
  FIRST_PERSON_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    sentence,
  );

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const lowerFirst = (text: string) =>
  text.charAt(0).toLowerCase() + text.slice(1);

const withoutTrailingCondition = (line: string) => {
  if (YES_NO_QUESTION_PATTERN.test(line)) return line;
  return line.replace(TRAILING_CONDITION_PATTERN, '');
};

const withoutConditions = (line: string) =>
  withoutTrailingCondition(
    line.replace(/[.!?]+$/, '').replace(LEADING_CONDITION_PATTERN, ''),
  )
    .replace(TRAILING_DIRECTIVE_PATTERN, '')
    .replace(LEADING_ADVERB_PATTERN, '')
    .trim();

const toCallerQuestion = (clause: string) =>
  CALLER_OBJECT_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    clause,
  );

const yesNoQuestionLine = (core: string) => {
  const topic = core.replace(QUESTION_VERB_PATTERN, '');
  const direct = DIRECT_CLAUSE_PATTERN.exec(
    toCallerQuestion(topic.replace(YES_NO_TOPIC_PATTERN, '')),
  );
  if (!direct) return `Can you tell me ${lowerFirst(toFirstPerson(topic))}?`;
  const [, subject, auxiliary, rest] = direct;
  return `${capitalize(auxiliary.toLowerCase())} ${subject.toLowerCase()} ${rest}`
    .trim()
    .concat('?');
};

const questionLine = (core: string) => {
  if (YES_NO_QUESTION_PATTERN.test(core)) return yesNoQuestionLine(core);
  const topic = toFirstPerson(core.replace(QUESTION_VERB_PATTERN, ''));
  if (QUESTION_WORD_PATTERN.test(topic)) {
    return `Can you tell me ${lowerFirst(topic)}?`;
  }
  return `Can you tell me about ${lowerFirst(topic)}?`;
};

const statementLine = (core: string) => {
  const statement = toFirstPerson(core.replace(SAY_VERB_PATTERN, ''));
  if (GENERIC_STATEMENT_PATTERN.test(statement)) return null;
  return `${capitalize(statement)}.`;
};

const shareLine = (core: string) => {
  const values = markedValues(core);
  if (values.length === 0) return null;
  return `${SHARED_VALUE_PREFIX}${values.join(', ')}.`;
};

const callerLine = (core: string) => {
  if (!core || IDENTITY_PATTERN.test(core)) return null;
  if (THIRD_PERSON_PATTERN.test(core)) return null;
  if (QUESTION_VERB_PATTERN.test(core)) return questionLine(core);
  if (SAY_VERB_PATTERN.test(core)) return statementLine(core);
  if (SHARE_VERB_PATTERN.test(core)) return shareLine(core);
  if (REQUEST_VERB_PATTERN.test(core)) {
    return `I'd like to ${lowerFirst(toFirstPerson(core))}.`;
  }
  if (DIRECTIVE_PATTERN.test(core)) return null;
  return `${capitalize(toFirstPerson(core))}.`;
};

const toCallerLine = (line: string) => {
  const spoken = callerLine(withoutConditions(line));
  if (!spoken) return null;
  return unmark(spoken);
};

const identityLine = (lines: string[]) =>
  lines.find((line) => IDENTITY_PATTERN.test(line));

const purposeOf = (line: string) => {
  const core = withoutConditions(line);
  const thirdPerson = THIRD_PERSON_PURPOSE_PATTERN.exec(core);
  if (thirdPerson) return thirdPerson[1];
  if (!IDENTITY_PATTERN.test(core)) return null;
  return CALLING_PURPOSE_PATTERN.exec(core)?.[1] ?? null;
};

const callingPurpose = (lines: string[]) => {
  for (const line of lines) {
    const purpose = purposeOf(line);
    if (purpose) return `I'm calling to ${unmark(toFirstPerson(purpose))}.`;
  }
  return null;
};

const callerGreeting = (identity: string | undefined, hasOpening: boolean) => {
  const [name] = markedValues(identity ?? '');
  if (name && hasOpening) return `This is ${name}.`;
  if (name) return `Hi, this is ${name}.`;
  if (hasOpening) return '';
  return 'Hi.';
};

const sharedValueOf = (line: string) =>
  line.replace(SHARED_VALUE_PREFIX, '').replace(/\.$/, '');

const firstCallerTurn = (greeting: string, purpose: string) =>
  `${greeting} ${purpose}`.trim();

const callerSteps = (input: PlaceCallInput) => {
  const lines = instructionLines(input);
  const greeting = callerGreeting(
    identityLine(lines),
    Boolean(input.evaluator.firstMessage?.trim()),
  );
  const steps = lines
    .map(toCallerLine)
    .filter((line): line is string => line !== null)
    .filter((line) => !greeting || !greeting.includes(sharedValueOf(line)));
  const purpose = callingPurpose(lines);
  if (purpose) {
    return [firstCallerTurn(greeting, purpose), ...steps].slice(
      0,
      MAX_CALLER_STEPS,
    );
  }
  const [first, ...rest] = steps;
  if (!first || first.startsWith(SHARED_VALUE_PREFIX)) {
    return [firstCallerTurn(greeting, DEFAULT_PURPOSE), ...steps].slice(
      0,
      MAX_CALLER_STEPS,
    );
  }
  return [firstCallerTurn(greeting, first), ...rest].slice(0, MAX_CALLER_STEPS);
};

const findCallerName = (variables: CallVariable[]) =>
  variables.find((variable) => NAME_KEYS.includes(variable.key.toLowerCase()))
    ?.value;

const AGENT_FOLLOW_UPS = [
  'Sure, I can help with that. Can you give me a few more details?',
  'Thank you. Let me check that for you.',
  'Got it. Is there anything else I should know?',
  'Thank you for the details.',
];

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
  turns.push({
    role: TranscriptRole.main_agent,
    content: agentGreeting(input),
  });
  callerSteps(input).forEach((step, index) => {
    if (index > 0) {
      turns.push({
        role: TranscriptRole.main_agent,
        content: AGENT_FOLLOW_UPS[(index - 1) % AGENT_FOLLOW_UPS.length],
      });
    }
    turns.push({ role: TranscriptRole.testing_agent, content: step });
  });
  turns.push(
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
