'use client';

import { LANGUAGE_ITEMS } from '../../../_constants/form-items';
import { EnumSelectField } from '../fields/enum-select-field';
import { FormSectionHeader } from '../form-section-header';
import { VoiceSelectField } from './voice-select-field';

export function VoiceLanguageSection() {
  return (
    <section>
      <FormSectionHeader
        title="Voice and Language"
        description="The voice the caller speaks with and the language it speaks."
      />
      <div className="grid gap-4 p-3 md:grid-cols-2">
        <VoiceSelectField />
        <EnumSelectField
          name="language"
          label="Language"
          items={LANGUAGE_ITEMS}
          required
          placeholder="Select Language"
        />
      </div>
    </section>
  );
}
