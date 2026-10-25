import { ConversationSource } from '@/server/conversations/constants/conversation-source';

const pad = (value: number) => String(value).padStart(2, '0');

export const formatClock = (seconds: number) => {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${pad(safe % 60)}`;
};

export const formatTurnTime = (
  seconds: number | null,
  source: ConversationSource,
) => {
  if (seconds === null) return '';
  if (source === ConversationSource.call) return formatClock(seconds);
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const rest = safe - minutes * 60;
  return `${minutes}:${rest.toFixed(2).padStart(5, '0')}`;
};

export const formatAxisTime = (seconds: number) => {
  const safe = Math.max(0, Math.round(seconds));
  return `${pad(Math.floor(safe / 60))}:${pad(safe % 60)}`;
};
