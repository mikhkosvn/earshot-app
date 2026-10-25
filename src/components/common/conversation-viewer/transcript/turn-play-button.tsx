'use client';

import { PlayIcon } from 'lucide-react';
import type { RefObject } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ConversationTurnItem } from '@/server/conversations/types';

import { playAudioFrom } from '../_utils/playback';

type TurnPlayButtonProps = {
  turn: ConversationTurnItem;
  audioRef: RefObject<HTMLAudioElement | null>;
};

export function TurnPlayButton({ turn, audioRef }: TurnPlayButtonProps) {
  const startTime = turn.startTime;
  if (startTime === null) return null;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Play from here"
            className="text-muted-foreground"
            onClick={() => playAudioFrom(audioRef.current, startTime)}
          />
        }
      >
        <PlayIcon className="size-3" />
      </TooltipTrigger>
      <TooltipContent>Play from here</TooltipContent>
    </Tooltip>
  );
}
