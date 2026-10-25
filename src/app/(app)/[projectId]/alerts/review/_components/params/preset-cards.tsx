'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  type SensitivityPreset,
  SensitivityPresetLabel,
} from '@/server/alerts/constants/alert-presets';

export type PresetOption = {
  preset: SensitivityPreset;
  description: string;
  detail: string;
};

type PresetCardsProps = {
  value: SensitivityPreset | null;
  options: PresetOption[];
  onChange: (preset: SensitivityPreset) => void;
};

export function PresetCards({ value, options, onChange }: PresetCardsProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3">
      <p className="text-xs font-medium">Sensitivity preset</p>
      <RadioGroup
        value={value}
        onValueChange={(next) => {
          const option = options.find((item) => item.preset === next);
          if (!option) return;
          onChange(option.preset);
        }}
        aria-label="Sensitivity preset"
        className="grid grid-cols-3 gap-2"
      >
        {options.map((option) => (
          <label
            key={option.preset}
            className="flex cursor-pointer flex-col gap-1.5 rounded-md border bg-background p-2 has-data-checked:border-blue-400 has-data-checked:bg-blue-50 dark:has-data-checked:bg-blue-950"
          >
            <span className="flex items-center justify-between gap-1">
              <span className="text-xs font-medium">
                {SensitivityPresetLabel[option.preset]}
              </span>
              <RadioGroupItem value={option.preset} className="sr-only" />
            </span>
            <span className="text-[11px] leading-snug text-muted-foreground">
              {option.description}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {option.detail}
            </span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
