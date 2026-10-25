'use client';

import { Volume2Icon } from 'lucide-react';

import {
  VOICE_VOLUME_MAX,
  VOICE_VOLUME_MIN,
} from '@/server/personalities/constants/personality-limits';

import { VOICE_MODEL_ITEMS } from '../../../_constants/form-items';
import { EnumSelectField } from '../fields/enum-select-field';
import { SliderField } from '../fields/slider-field';
import { FormSectionHeader } from '../form-section-header';
import { VoiceIdField } from './voice-id-field';

export function VoiceSection() {
  return (
    <section>
      <FormSectionHeader
        title="Voice"
        description="The model, voice and delivery used to speak."
      />
      <div className="flex flex-col gap-4 p-3">
        <div className="grid gap-4 md:grid-cols-2">
          <EnumSelectField
            name="voiceModel"
            label="Voice Model"
            items={VOICE_MODEL_ITEMS}
            required
            placeholder="Select voice model"
          />
          <VoiceIdField />
        </div>
        <SliderField
          name="voiceVolume"
          label="Volume"
          icon={Volume2Icon}
          min={VOICE_VOLUME_MIN}
          max={VOICE_VOLUME_MAX}
          step={0.01}
          suffix="x"
          rangeText="0.01x to 2.00x"
          help="How loudly the testing agent speaks. Works on every voice provider; values below 1 simulate a caller who is hard to hear."
        />
      </div>
    </section>
  );
}
