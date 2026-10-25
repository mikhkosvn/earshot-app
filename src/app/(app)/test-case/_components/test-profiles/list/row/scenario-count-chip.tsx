import { Badge } from '@/components/ui/badge';

interface ScenarioCountChipProps {
  count: number;
}

export function ScenarioCountChip({ count }: ScenarioCountChipProps) {
  if (count === 0) return <span className="text-muted-foreground">-</span>;
  return <Badge variant="outline">{count}</Badge>;
}
