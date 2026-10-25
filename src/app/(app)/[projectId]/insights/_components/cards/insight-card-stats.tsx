import type { InsightCardView } from '@/server/insights/types';

interface InsightCardStatsProps {
  card: InsightCardView;
}

const plural = (count: number, word: string, words: string) => {
  if (count === 1) return `1 ${word}`;
  return `${count} ${words}`;
};

export function InsightCardStats({ card }: InsightCardStatsProps) {
  return (
    <footer className="border-t bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
      {plural(card.categories.length, 'category', 'categories')} ·{' '}
      {plural(card.failures, 'failure', 'failures')} ·{' '}
      {card.evalType.replaceAll('_', ' ')}
    </footer>
  );
}
