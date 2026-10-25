import { Badge } from '@/components/ui/badge';

interface DefaultProfileBadgeProps {
  isDefault: boolean;
}

export function DefaultProfileBadge({ isDefault }: DefaultProfileBadgeProps) {
  if (!isDefault) return null;
  return (
    <Badge variant="secondary" className="text-[10px]">
      Default
    </Badge>
  );
}
