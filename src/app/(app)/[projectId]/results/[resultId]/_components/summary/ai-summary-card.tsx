'use client';

import { SparklesIcon } from 'lucide-react';

import { AiSummaryBody } from './ai-summary-body';
import { AiSummarySubtitle } from './ai-summary-subtitle';

export function AiSummaryCard() {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center gap-3 border-b bg-linear-to-r from-blue-50 to-background px-4 py-3 dark:from-blue-950/40">
        <span className="flex size-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300">
          <SparklesIcon className="size-4" />
        </span>
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">AI summary</h2>
          <AiSummarySubtitle />
        </div>
      </div>
      <AiSummaryBody />
    </section>
  );
}
