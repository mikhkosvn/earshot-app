'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { CommandEmpty, CommandGroup } from '@/components/ui/command';
import type { VoiceModel } from '@/generated/prisma/enums';

import { PersonalityService } from '../../../../_service';
import { CustomVoiceItem } from './custom-voice-item';
import { VoiceOptionItem } from './voice-option-item';

type VoiceOptionsProps = {
  voiceModel: VoiceModel;
  search: string;
  onSelect: (voiceId: string) => void;
};

export function VoiceOptions({
  voiceModel,
  search,
  onSelect,
}: VoiceOptionsProps) {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(
    PersonalityService.getVoicesQuery({ projectId, voiceModel }),
  );

  return (
    <>
      <CommandEmpty>No voices found.</CommandEmpty>
      <CustomVoiceItem search={search} onSelect={onSelect} />
      <CommandGroup heading="Cloned voices" hidden={data.cloned.length === 0}>
        {data.cloned.map((voice) => (
          <VoiceOptionItem key={voice.id} voice={voice} onSelect={onSelect} />
        ))}
      </CommandGroup>
      <CommandGroup heading="Voices" hidden={data.catalog.length === 0}>
        {data.catalog.map((voice) => (
          <VoiceOptionItem key={voice.id} voice={voice} onSelect={onSelect} />
        ))}
      </CommandGroup>
    </>
  );
}
