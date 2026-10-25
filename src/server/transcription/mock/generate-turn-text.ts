import 'server-only';

import { z } from 'zod';

import { generateObject } from '@/server/ai/generate-object';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import { mockTurnLines } from '@/server/transcription/mock/mock-turn-lines';
import type {
  TranscribedTurn,
  TranscriptionContext,
  TurnSlot,
} from '@/server/transcription/types';

const SYSTEM_PROMPT =
  'You write a believable phone call transcript between a voice agent (Main Agent) and a caller (Testing Agent). You get the speaker and the length in seconds of each turn. Write one line for each turn, in the same order. Fit the length of each line to its duration, at about 2.5 words each second.';

const linesSchema = z.object({ lines: z.array(z.string()) });

const slotText = (slot: TurnSlot, index: number) =>
  `${index + 1}. ${TRANSCRIPT_ROLE_LABEL[slot.role]}, ${Math.max(1, Math.round(slot.endTime - slot.startTime))} seconds`;

const contextText = (context: TranscriptionContext | undefined) => {
  if (!context) return 'The agent is a customer service agent.';
  return `Agent name: ${context.agentName}\nAgent description: ${context.agentDescription}`;
};

export const generateTurnText = async (
  slots: TurnSlot[],
  context: TranscriptionContext | undefined,
): Promise<TranscribedTurn[]> => {
  if (slots.length === 0) return [];
  const fallback = mockTurnLines(slots, context);
  const { lines } = await generateObject({
    system: SYSTEM_PROMPT,
    prompt: `${contextText(context)}\n\nTurns:\n${slots.map(slotText).join('\n')}`,
    schema: linesSchema,
    mock: () => ({ lines: fallback }),
  });
  return slots.map((slot, index) => ({
    role: slot.role,
    content: lines[index]?.trim() || fallback[index],
    startTime: slot.startTime,
    endTime: slot.endTime,
  }));
};
