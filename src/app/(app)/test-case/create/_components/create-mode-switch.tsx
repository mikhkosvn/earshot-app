'use client';

import { FileTextIcon, LayoutGridIcon, ZapIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { CreateMode, CreateModeLabel } from '../_constants/create-mode';

const MODE_ICONS = {
  [CreateMode.ai]: ZapIcon,
  [CreateMode.manual]: LayoutGridIcon,
  [CreateMode.transcript]: FileTextIcon,
};

const isCreateMode = (value: unknown): value is CreateMode =>
  Object.values(CreateMode).includes(value as CreateMode);

type CreateModeSwitchProps = {
  mode: CreateMode;
  onModeChange: (mode: CreateMode) => void;
};

export function CreateModeSwitch({
  mode,
  onModeChange,
}: CreateModeSwitchProps) {
  return (
    <ToggleGroup
      aria-label="Create mode"
      variant="outline"
      spacing={0}
      value={[mode]}
      onValueChange={(values) => {
        const [next] = values;
        if (isCreateMode(next)) onModeChange(next);
      }}
      className="rounded-lg border p-0.5"
    >
      {Object.values(CreateMode).map((value) => {
        const Icon = MODE_ICONS[value];
        return (
          <ToggleGroupItem
            key={value}
            value={value}
            className="border-0 data-pressed:bg-primary data-pressed:text-primary-foreground"
          >
            <Icon />
            {CreateModeLabel[value]}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
