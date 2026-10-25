'use client';

import { CommandGroup, CommandItem } from '@/components/ui/command';

type CustomVoiceItemProps = {
  search: string;
  onSelect: (voiceId: string) => void;
};

export function CustomVoiceItem({ search, onSelect }: CustomVoiceItemProps) {
  const voiceId = search.trim();
  if (!voiceId) return null;

  return (
    <CommandGroup forceMount>
      <CommandItem
        forceMount
        value={`custom-${voiceId}`}
        onSelect={() => onSelect(voiceId)}
      >
        Use voice ID &quot;{voiceId}&quot;
      </CommandItem>
    </CommandGroup>
  );
}
