import type { MetricSubCategory } from '@/generated/prisma/enums';
import type { PredefinedMetricCard } from '@/server/metrics/types';

import { PredefinedTab } from '../_constants/predefined-tab';

export type PredefinedCardSection = {
  subCategory: MetricSubCategory | null;
  cards: PredefinedMetricCard[];
};

const matchesSearch = (card: PredefinedMetricCard, search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return [card.name, card.description, card.code].some((text) =>
    text.toLowerCase().includes(term),
  );
};

const matchesTab = (card: PredefinedMetricCard, tab: PredefinedTab) => {
  if (tab === PredefinedTab.all) return true;
  return card.category === tab;
};

export const filterPredefinedCards = (
  cards: PredefinedMetricCard[],
  search: string,
  tab: PredefinedTab,
) =>
  cards.filter((card) => matchesTab(card, tab) && matchesSearch(card, search));

export const sectionsBySubCategory = (
  cards: PredefinedMetricCard[],
): PredefinedCardSection[] => {
  const sections: PredefinedCardSection[] = [];
  const plain = cards.filter((card) => card.subCategory === null);
  if (plain.length > 0) sections.push({ subCategory: null, cards: plain });
  cards.forEach((card) => {
    if (card.subCategory === null) return;
    const section = sections.find(
      (item) => item.subCategory === card.subCategory,
    );
    if (section) {
      section.cards.push(card);
      return;
    }
    sections.push({ subCategory: card.subCategory, cards: [card] });
  });
  return sections;
};
