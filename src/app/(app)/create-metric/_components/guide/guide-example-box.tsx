import { LightbulbIcon } from 'lucide-react';

import type { GuideTip } from '../../_constants/guide-tips';
import { GuideExampleLabel } from './guide-example-label';

interface GuideExampleBoxProps {
  examples: GuideTip['examples'];
}

export function GuideExampleBox({ examples }: GuideExampleBoxProps) {
  if (examples.length === 0) return null;

  return (
    <div className="flex gap-2 rounded-md border border-blue-200 bg-blue-50 p-2.5 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
      <LightbulbIcon className="mt-0.5 size-4 shrink-0" />
      <div className="flex flex-col gap-1">
        {examples.map((example) => (
          <p key={example.text}>
            <GuideExampleLabel label={example.label} />
            {example.text}
          </p>
        ))}
      </div>
    </div>
  );
}
