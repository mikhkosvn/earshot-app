'use client';

import { GaugeIcon } from 'lucide-react';

import { SPEED_MAX, SPEED_MIN } from '@/server/personalities/constants/personality-limits';

import { INTERRUPTION_ITEMS, LANGUAGE_ITEMS } from '../../../_constants/form-items';
import { EnumSelectField } from '../fields/enum-select-field';
import { SliderField } from '../fields/slider-field';
import { FormSectionHeader } from '../form-section-header';

export function ConversationSection() {
  return (
    <section>
      <FormSectionHeader
        title="Conversation"
        description="How the agent paces itself and which language it speaks."
      />
      <div className="flex flex-col gap-4 p-3">
        <div className="grid gap-4 md:grid-cols-2">
          <EnumSelectField
            name="interruptionLevel"
            label="Interruption Level"
            items={INTERRUPTION_ITEMS}
            required={false}
            placeholder="Off"
          />
          <EnumSelectField
            name="language"
            label="Language"
            items={LANGUAGE_ITEMS}
            required
            placeholder="Select Language"
          />
        </div>
        <SliderField
          name="speed"
          label="Speed"
          icon={GaugeIcon}
          min={SPEED_MIN}
          max={SPEED_MAX}
          step={0.01}
          suffix="x"
          rangeText="0.80x to 1.20x"
        />
      </div>
    </section>
  );
}
