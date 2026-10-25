'use client';

import { type ReactNode, useState } from 'react';

import {
  VariableEditorMode,
  type VariableListName,
} from '../../../../_constants/variable-editor-mode';
import { VariableEditor } from './variable-editor';
import { VariableModeToggle } from './variable-mode-toggle';

interface VariableSectionProps {
  name: VariableListName;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export function VariableSection({
  name,
  title,
  subtitle,
  icon,
}: VariableSectionProps) {
  const [mode, setMode] = useState<VariableEditorMode>(
    VariableEditorMode.table,
  );

  return (
    <section className="flex flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="rounded-md bg-muted p-1.5">{icon}</span>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <VariableModeToggle label={title} mode={mode} onModeChange={setMode} />
      </div>
      <VariableEditor name={name} mode={mode} />
    </section>
  );
}
