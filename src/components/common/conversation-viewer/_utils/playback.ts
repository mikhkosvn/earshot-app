import type { ConversationTurnItem } from '@/server/conversations/types';

const TURN_GAP_SECONDS = 0.25;

export const seekAudio = (audio: HTMLAudioElement | null, time: number) => {
  if (!audio) return;
  const end = Number.isFinite(audio.duration) ? audio.duration : time;
  audio.currentTime = Math.min(Math.max(0, time), end);
};

export const playAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.play().catch(() => undefined);
};

export const playAudioFrom = (audio: HTMLAudioElement | null, time: number) => {
  seekAudio(audio, time);
  playAudio(audio);
};

export const toggleAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  if (audio.paused) {
    playAudio(audio);
    return;
  }
  audio.pause();
};

export const skipAudio = (audio: HTMLAudioElement | null, seconds: number) => {
  if (!audio) return;
  seekAudio(audio, audio.currentTime + seconds);
};

const turnStarts = (turns: ConversationTurnItem[]) =>
  turns.flatMap((turn) => {
    if (turn.startTime === null) return [];
    return [turn.startTime];
  });

export const jumpToPreviousTurn = (
  audio: HTMLAudioElement | null,
  turns: ConversationTurnItem[],
) => {
  if (!audio) return;
  const time = audio.currentTime - TURN_GAP_SECONDS;
  const start = turnStarts(turns).findLast((value) => value < time);
  seekAudio(audio, start ?? 0);
};

export const jumpToNextTurn = (
  audio: HTMLAudioElement | null,
  turns: ConversationTurnItem[],
) => {
  if (!audio) return;
  const time = audio.currentTime + TURN_GAP_SECONDS;
  const start = turnStarts(turns).find((value) => value > time);
  if (start === undefined) return;
  seekAudio(audio, start);
};

export const setAudioMuted = (audio: HTMLAudioElement | null, muted: boolean) => {
  if (!audio) return;
  audio.muted = muted;
};

export const setAudioSpeed = (audio: HTMLAudioElement | null, speed: number) => {
  if (!audio) return;
  audio.playbackRate = speed;
};

export const isActiveTurn = (turn: ConversationTurnItem, time: number) => {
  if (turn.startTime === null || turn.endTime === null) return false;
  return time >= turn.startTime && time < turn.endTime;
};

export const progressPercent = (time: number, duration: number) => {
  if (duration <= 0) return 0;
  return Math.min(100, Math.max(0, (time / duration) * 100));
};
