import { Badge } from '@/components/ui/badge';

interface CurrentVersionBadgeProps {
  isCurrent: boolean;
}

export function CurrentVersionBadge({ isCurrent }: CurrentVersionBadgeProps) {
  if (!isCurrent) return null;
  return (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
      Current
    </Badge>
  );
}
