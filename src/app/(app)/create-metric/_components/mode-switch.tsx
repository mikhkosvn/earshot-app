'use client';

import { LayoutGridIcon, ZapIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { CreateMode } from '../_constants/create-mode';
import { isCreateMode } from '../_utils/create-mode';

type ModeSwitchProps = {
  mode: CreateMode;
  onModeChange: (mode: CreateMode) => void;
};

const ITEM_CLASS =
  'aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90';

export function ModeSwitch({ mode, onModeChange }: ModeSwitchProps) {
  return (
    <ToggleGroup
      aria-label="Create mode"
      value={[mode]}
      className="rounded-lg border p-1"
      onValueChange={(next) => {
        const [selected] = next;
        if (!isCreateMode(selected)) return;
        onModeChange(selected);
      }}
    >
      <ToggleGroupItem value={CreateMode.quick} className={ITEM_CLASS}>
        <ZapIcon />
        Quick Mode
      </ToggleGroupItem>
      <ToggleGroupItem value={CreateMode.detail} className={ITEM_CLASS}>
        <LayoutGridIcon />
        Detail Mode
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
