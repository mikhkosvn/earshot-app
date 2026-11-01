import { Badge } from '@/components/ui/badge';

interface DefaultChipProps {
  isProjectDefault: boolean;
}

export function DefaultChip({ isProjectDefault }: DefaultChipProps) {
  if (!isProjectDefault) return null;
  return (
    <Badge variant="outline" className="shrink-0">
      Default
    </Badge>
  );
}
