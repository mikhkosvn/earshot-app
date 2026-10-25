'use client';

import { Controller } from 'react-hook-form';

import {
  RunChannel,
  RunChannelLabel,
} from '@/server/runs/constants/run-channel';

import type { RunFromFileForm } from '../_hooks/use-run-from-file-form';
import { LabeledField } from '../fields/labeled-field';
import { OptionSelect } from '../fields/option-select';

type SpecChannelFieldProps = {
  control: RunFromFileForm['control'];
};

const CHANNEL_ITEMS = Object.values(RunChannel).map((channel) => ({
  value: channel,
  label: RunChannelLabel[channel],
}));

export function SpecChannelField({ control }: SpecChannelFieldProps) {
  return (
    <Controller
      control={control}
      name="channel"
      render={({ field }) => (
        <LabeledField id="spec-channel" label="Channel">
          <OptionSelect
            id="spec-channel"
            ariaLabel="Channel"
            items={CHANNEL_ITEMS}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Select a channel"
          />
        </LabeledField>
      )}
    />
  );
}
