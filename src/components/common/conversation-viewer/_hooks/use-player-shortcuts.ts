'use client';

import { type RefObject, useEffect, useEffectEvent } from 'react';

import type { ConversationTurnItem } from '@/server/conversations/types';

import { PlayerShortcutKey, SKIP_SECONDS } from '../_constants/playback';
import {
  jumpToNextTurn,
  jumpToPreviousTurn,
  skipAudio,
} from '../_utils/playback';

const TYPING_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return TYPING_TAGS.includes(target.tagName);
};

export const usePlayerShortcuts = (
  audioRef: RefObject<HTMLAudioElement | null>,
  turns: ConversationTurnItem[],
) => {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey) return;
    const audio = audioRef.current;
    if (event.shiftKey && event.key === PlayerShortcutKey.previousTurn) {
      event.preventDefault();
      jumpToPreviousTurn(audio, turns);
      return;
    }
    if (event.shiftKey && event.key === PlayerShortcutKey.nextTurn) {
      event.preventDefault();
      jumpToNextTurn(audio, turns);
      return;
    }
    const key = event.key.toLowerCase();
    if (key === PlayerShortcutKey.back) skipAudio(audio, -SKIP_SECONDS);
    if (key === PlayerShortcutKey.forward) skipAudio(audio, SKIP_SECONDS);
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onKeyDown(event);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);
};
