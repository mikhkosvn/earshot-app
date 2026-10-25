'use client';

import { CommandItem } from '@/components/ui/command';
import type { VoiceOption } from '@/server/voices/types';

import { PlaySampleButton } from './play-sample-button';

type VoiceOptionItemProps = {
  voice: VoiceOption;
  onSelect: (voiceId: string) => void;
};

export function VoiceOptionItem({ voice, onSelect }: VoiceOptionItemProps) {
  return (
    <CommandItem
      value={`${voice.label} ${voice.id}`}
      onSelect={() => onSelect(voice.id)}
      className="gap-2"
    >
      <span className="min-w-0 flex-1 truncate">{voice.label}</span>
      <span className="max-w-28 truncate font-mono text-[10px] text-muted-foreground">
        {voice.id}
      </span>
      <PlaySampleButton fileId={voice.sampleFileId} label={voice.label} />
    </CommandItem>
  );
}
