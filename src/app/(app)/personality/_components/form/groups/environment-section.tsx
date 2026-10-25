'use client';

import { BACKGROUND_NOISE_ITEMS } from '../../../_constants/form-items';
import { EnumSelectField } from '../fields/enum-select-field';
import { FormSectionHeader } from '../form-section-header';
import { CustomNoiseUrlField } from './custom-noise-url-field';

export function EnvironmentSection() {
  return (
    <section>
      <FormSectionHeader
        title="Environment"
        description="Ambient sound layered under the call."
      />
      <div className="flex flex-col gap-4 p-3">
        <EnumSelectField
          name="backgroundNoise"
          label="Background Noise"
          items={BACKGROUND_NOISE_ITEMS}
          required={false}
          placeholder="None"
        />
        <CustomNoiseUrlField />
      </div>
    </section>
  );
}
