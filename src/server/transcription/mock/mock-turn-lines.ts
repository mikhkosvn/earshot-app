import 'server-only';

import { TranscriptRole } from '@/server/call-engine/constants';
import type {
  TranscriptionContext,
  TurnSlot,
} from '@/server/transcription/types';

const MAIN_LINES = [
  'Sure, I can help with that. Could you give me a few more details?',
  'Thank you. Let me check that for you.',
  'I found the information. Is there anything else you would like to know?',
  'Of course. I have noted that on your request.',
  'That is correct. You can also do this online at any time.',
];

const TESTING_LINES = [
  'Hi, I am calling to ask about my account.',
  'Yes, I would like to know what my options are.',
  'Okay, that makes sense.',
  'Can you tell me how long that takes?',
  'Great, thank you for checking.',
];

const MAIN_CLOSING = 'Thank you for calling. Have a nice day.';
const TESTING_CLOSING = 'No, that is all. Thanks for your help. Goodbye.';

const greeting = (context: TranscriptionContext | undefined) => {
  if (!context?.agentName)
    return 'Hello, thank you for calling. How can I help you today?';
  return `Hello, thank you for calling ${context.agentName}. How can I help you today?`;
};

const lineOf = (
  slot: TurnSlot,
  index: number,
  slots: TurnSlot[],
  context: TranscriptionContext | undefined,
) => {
  const isMain = slot.role === TranscriptRole.main_agent;
  if (index === slots.length - 1 && isMain) return MAIN_CLOSING;
  if (index === slots.length - 1) return TESTING_CLOSING;
  if (index === 0 && isMain) return greeting(context);
  const rolePosition = slots
    .slice(0, index)
    .filter((item) => item.role === slot.role).length;
  if (isMain) return MAIN_LINES[rolePosition % MAIN_LINES.length];
  return TESTING_LINES[rolePosition % TESTING_LINES.length];
};

export const mockTurnLines = (
  slots: TurnSlot[],
  context: TranscriptionContext | undefined,
) => slots.map((slot, index) => lineOf(slot, index, slots, context));
