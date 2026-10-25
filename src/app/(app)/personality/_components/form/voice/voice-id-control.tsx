'use client';

import { useWatch } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { VoicePicker } from './picker/voice-picker';

interface VoiceIdControlProps {
  id: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function VoiceIdControl({
  id,
  value,
  invalid,
  onChange,
  onBlur,
}: VoiceIdControlProps) {
  const voiceModel = useWatch<PersonalityFormValues, 'voiceModel'>({
    name: 'voiceModel',
  });
  if (!voiceModel) {
    return (
      <Input
        id={id}
        value={value}
        placeholder="Enter Voice ID"
        aria-invalid={invalid}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  return (
    <VoicePicker
      id={id}
      voiceModel={voiceModel}
      value={value}
      invalid={invalid}
      onChange={onChange}
    />
  );
}
