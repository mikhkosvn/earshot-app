'use client';

import { CodeIcon, TableIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { VariableEditorMode } from '../../../../_constants/variable-editor-mode';

type VariableModeToggleProps = {
  label: string;
  mode: VariableEditorMode;
  onModeChange: (mode: VariableEditorMode) => void;
};

const isMode = (value: unknown): value is VariableEditorMode =>
  Object.values(VariableEditorMode).includes(value as VariableEditorMode);

export function VariableModeToggle({
  label,
  mode,
  onModeChange,
}: VariableModeToggleProps) {
  return (
    <ToggleGroup
      aria-label={`${label} editor`}
      variant="outline"
      size="sm"
      value={[mode]}
      onValueChange={(values) => {
        const [next] = values;
        if (isMode(next)) onModeChange(next);
      }}
    >
      <ToggleGroupItem value={VariableEditorMode.table}>
        <TableIcon />
        Table
      </ToggleGroupItem>
      <ToggleGroupItem value={VariableEditorMode.json}>
        <CodeIcon />
        JSON
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
