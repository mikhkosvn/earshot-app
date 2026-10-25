'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { GUIDE_TIPS } from '../../_constants/guide-tips';
import { GuideTipCard } from './guide-tip-card';

interface GuidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuidePanel({ isOpen, onClose }: GuidePanelProps) {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Guide"
      className="flex flex-col rounded-lg border bg-background lg:sticky lg:top-3"
    >
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h2 className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          Guide - Create a Metric
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close guide"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Best Practices</h3>
          <p className="text-sm text-muted-foreground">
            Best practices for writing effective LLM evaluation prompts and
            setting up tests.
          </p>
        </div>
        {GUIDE_TIPS.map((tip) => (
          <GuideTipCard key={tip.title} tip={tip} />
        ))}
      </div>
    </aside>
  );
}
