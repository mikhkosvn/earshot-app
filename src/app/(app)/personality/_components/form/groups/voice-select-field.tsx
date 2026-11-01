'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import type { PersonalityFormValues } from '@/server/personalities/types';

import { voiceItems } from '../../../_utils/voice-items';
import { EnumSelectField } from '../fields/enum-select-field';

export function VoiceSelectField() {
  const { control } = useFormContext<PersonalityFormValues>();
  const language = useWatch({ control, name: 'language' });

  return (
    <EnumSelectField
      name="voice"
      label="Voice"
      items={voiceItems(language)}
      required
      placeholder="Select Voice"
    />
  );
}
