'use client';

import { TriangleAlertIcon } from 'lucide-react';
import { useWatch } from 'react-hook-form';

import { SHORT_DESCRIPTION_LENGTH } from '@/server/agents/constants/agent-limits';
import type { AgentConfigValues } from '@/server/agents/types';

export function ShortDescriptionWarning() {
  const description = useWatch<AgentConfigValues, 'description'>({
    name: 'description',
  });
  const length = description.trim().length;
  if (length === 0 || length >= SHORT_DESCRIPTION_LENGTH) return null;

  return (
    <div className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <TriangleAlertIcon className="mt-0.5 size-5 shrink-0 text-amber-600" />
      <div>
        <p className="font-semibold">This description looks a bit short.</p>
        <p>
          Adding a detailed description (if possible your prompt) will help us
          generate better test cases and find issues.
        </p>
      </div>
    </div>
  );
}
