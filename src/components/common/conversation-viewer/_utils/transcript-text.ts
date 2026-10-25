import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import type { ConversationTurnItem } from '@/server/conversations/types';

import { formatTurnTime } from './format-time';

export const turnLine = (turn: ConversationTurnItem) => {
  const speaker = `${TranscriptRoleLabel[turn.role]}: ${turn.content}`;
  if (turn.startTime === null) return speaker;
  return `[${formatTurnTime(turn.startTime)}] ${speaker}`;
};

export const transcriptText = (turns: ConversationTurnItem[]) =>
  turns.map(turnLine).join('\n');
