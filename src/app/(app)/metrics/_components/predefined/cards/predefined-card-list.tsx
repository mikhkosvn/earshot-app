'use client';

import type { PredefinedMetricCard } from '@/server/metrics/types';

import { sectionsBySubCategory } from '../../../_utils/predefined-cards';
import { PredefinedAddedCards } from './predefined-added-cards';
import { PredefinedCardSection } from './predefined-card-section';

interface PredefinedCardListProps {
  available: PredefinedMetricCard[];
  added: PredefinedMetricCard[];
  selectedCodes: string[];
  onToggle: (code: string, checked: boolean) => void;
}

export function PredefinedCardList({
  available,
  added,
  selectedCodes,
  onToggle,
}: PredefinedCardListProps) {
  if (available.length === 0 && added.length === 0) {
    return (
      <p className="py-6 text-center text-xs text-muted-foreground">
        No metrics found
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sectionsBySubCategory(available).map((section) => (
        <PredefinedCardSection
          key={section.subCategory ?? 'none'}
          section={section}
          selectedCodes={selectedCodes}
          onToggle={onToggle}
        />
      ))}
      <PredefinedAddedCards cards={added} />
    </div>
  );
}
