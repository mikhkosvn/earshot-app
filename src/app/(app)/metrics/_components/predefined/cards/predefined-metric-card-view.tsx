'use client';

import { CopyButton } from '@/components/common/clipboard/copy-button';
import type { PredefinedMetricCard } from '@/server/metrics/types';

import { PredefinedBadge } from './predefined-badge';
import { PredefinedCardCheckbox } from './predefined-card-checkbox';

type PredefinedMetricCardViewProps = {
  card: PredefinedMetricCard;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function PredefinedMetricCardView({
  card,
  checked,
  onCheckedChange,
}: PredefinedMetricCardViewProps) {
  return (
    <div className="flex gap-3 rounded-lg border p-3 text-xs">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-foreground">{card.name}</span>
          <PredefinedBadge badge={card.badge} />
        </div>
        <p className="whitespace-pre-line text-muted-foreground">
          {card.description}
        </p>
        <div className="flex items-center gap-1">
          <span className="rounded-sm border bg-muted/50 px-1.5 py-0.5 font-mono">
            {card.code}
          </span>
          <CopyButton value={card.code} label="Copy code" />
        </div>
      </div>
      <PredefinedCardCheckbox
        card={card}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
