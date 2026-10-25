'use client';

import { useState } from 'react';

import { EvaluatorsBreadcrumb } from '../../_components/evaluators-breadcrumb';
import { CreateMode } from '../_constants/create-mode';
import { CreateModeContent } from './create-mode-content';
import { CreateModeSwitch } from './create-mode-switch';

export function CreateEvaluatorView() {
  const [mode, setMode] = useState<CreateMode>(CreateMode.ai);

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-6 py-2.5">
        <EvaluatorsBreadcrumb current="Create an Evaluator" />
        <CreateModeSwitch mode={mode} onModeChange={setMode} />
      </header>
      <CreateModeContent mode={mode} />
    </div>
  );
}
