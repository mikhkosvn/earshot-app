'use client';

import { MetricSubCategoryLabel } from '@/server/metrics/constants/metric-sub-category-labels';

import type { PredefinedCardSection as PredefinedCardSectionData } from '../../../_utils/predefined-cards';
import { PredefinedMetricCardView } from './predefined-metric-card-view';

type PredefinedCardSectionProps = {
  section: PredefinedCardSectionData;
  selectedCodes: string[];
  onToggle: (code: string, checked: boolean) => void;
};

export function PredefinedCardSection({
  section,
  selectedCodes,
  onToggle,
}: PredefinedCardSectionProps) {
  const cards = section.cards.map((card) => (
    <PredefinedMetricCardView
      key={card.code}
      card={card}
      checked={selectedCodes.includes(card.code)}
      onCheckedChange={(checked) => onToggle(card.code, checked)}
    />
  ));

  if (section.subCategory === null) return cards;

  return (
    <>
      <h3 className="pt-2 text-xs font-semibold text-muted-foreground">
        {MetricSubCategoryLabel[section.subCategory]}
      </h3>
      {cards}
    </>
  );
}
