'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { usePatternGroup } from '../../../_hooks/use-pattern-group';
import { otherCallsText } from '../../../_utils/review-text';
import { OtherCallRow } from './other-call-row';

interface OtherCallsCollapsibleProps {
  groupKey: string;
}

export function OtherCallsCollapsible({
  groupKey,
}: OtherCallsCollapsibleProps) {
  const { others } = usePatternGroup(groupKey);

  if (others.length === 0) return null;

  return (
    <Collapsible className="contents">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground [&[data-panel-open]>svg]:rotate-180"
          />
        }
      >
        {otherCallsText(others.length)}
        <ChevronDownIcon className="transition-transform" />
      </CollapsibleTrigger>
      <CollapsibleContent className="order-last basis-full">
        <ul className="flex flex-col divide-y rounded-lg border">
          {others.map((sample) => (
            <OtherCallRow key={sample.conversationId} sample={sample} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
