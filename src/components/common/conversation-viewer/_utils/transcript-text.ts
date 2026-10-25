import type { ConversationSource } from '@/server/conversations/constants/conversation-source';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import type { ConversationTurnItem } from '@/server/conversations/types';

import { formatTurnTime } from './format-time';

export const turnLine = (
  turn: ConversationTurnItem,
  source: ConversationSource,
) => {
  const speaker = `${TranscriptRoleLabel[turn.role]}: ${turn.content}`;
  if (turn.startTime === null) return speaker;
  return `[${formatTurnTime(turn.startTime, source)}] ${speaker}`;
};

export const transcriptText = (
  turns: ConversationTurnItem[],
  source: ConversationSource,
) => turns.map((turn) => turnLine(turn, source)).join('\n');
