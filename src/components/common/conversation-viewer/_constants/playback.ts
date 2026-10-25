export const SKIP_SECONDS = 10;

export const DEFAULT_PLAYBACK_SPEED = 1.25;

export const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export const PlayerShortcutKey = {
  back: 'j',
  forward: 'l',
  previousTurn: 'ArrowLeft',
  nextTurn: 'ArrowRight',
} as const;

export type PlayerShortcutKey =
  (typeof PlayerShortcutKey)[keyof typeof PlayerShortcutKey];
