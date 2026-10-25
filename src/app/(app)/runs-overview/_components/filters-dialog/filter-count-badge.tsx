import { Badge } from '@/components/ui/badge';

type FilterCountBadgeProps = {
  count: number;
};

export function FilterCountBadge({ count }: FilterCountBadgeProps) {
  if (count === 0) return null;
  return (
    <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
      {count}
    </Badge>
  );
}
