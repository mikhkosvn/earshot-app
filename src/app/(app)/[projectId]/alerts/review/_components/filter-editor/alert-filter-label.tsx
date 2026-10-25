import type { AlertFilters } from '@/server/alerts/types';

type AlertFilterLabelProps = {
  filters: AlertFilters;
};

export function AlertFilterLabel({ filters }: AlertFilterLabelProps) {
  const count = filters.agentIds.length + filters.metadata.length;

  if (count === 0) return 'Configure Filter';
  if (count === 1) return '1 filter';
  return `${count} filters`;
}
