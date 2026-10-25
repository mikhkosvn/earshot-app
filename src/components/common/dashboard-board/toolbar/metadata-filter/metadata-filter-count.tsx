import { Badge } from '@/components/ui/badge';

interface MetadataFilterCountProps {
  count: number;
}

export function MetadataFilterCount({ count }: MetadataFilterCountProps) {
  if (count === 0) return null;
  return (
    <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
      {count}
    </Badge>
  );
}
