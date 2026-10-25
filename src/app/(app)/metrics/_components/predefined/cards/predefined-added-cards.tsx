'use client';

import type { PredefinedMetricCard } from '@/server/metrics/types';

import { sectionsBySubCategory } from '../../../_utils/predefined-cards';
import { PredefinedCardSection } from './predefined-card-section';

interface PredefinedAddedCardsProps {
  cards: readonly PredefinedMetricCard[];
}

const ignoreToggle = () => undefined;

export function PredefinedAddedCards({ cards }: PredefinedAddedCardsProps) {
  if (cards.length === 0) return null;

  return (
    <>
      <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        Already added metrics
        <div className="h-px flex-1 bg-border" />
      </div>
      {sectionsBySubCategory(cards).map((section) => (
        <PredefinedCardSection
          key={section.subCategory ?? 'none'}
          section={section}
          selectedCodes={[]}
          onToggle={ignoreToggle}
        />
      ))}
    </>
  );
}
